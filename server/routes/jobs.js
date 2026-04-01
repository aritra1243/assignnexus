import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import Job from '../models/Job.js';
import Notification from '../models/Notification.js';
import { authenticate, requireAdmin, requireApproved } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    cb(null, true); // Accept all file types
  }
});

const router = express.Router();

// Create a job (admin only)
router.post('/', authenticate, requireAdmin, upload.single('file'), async (req, res) => {
  try {
    const { jobId, date, description } = req.body;

    if (!jobId || !date || !description) {
      return res.status(400).json({ message: 'Job ID, date, and description are required' });
    }

    // Check for duplicate jobId
    const existingJob = await Job.findOne({ jobId });
    if (existingJob) {
      return res.status(400).json({ message: 'A job with this ID already exists' });
    }

    const job = new Job({
      jobId,
      date: new Date(date),
      description,
      file: req.file ? `/uploads/${req.file.filename}` : null,
      fileName: req.file ? req.file.originalname : null,
      createdBy: req.user._id
    });
    await job.save();

    // Populate createdBy
    await job.populate('createdBy', 'name email');

    // Create notification for all users
    const notification = new Notification({
      type: 'new_job',
      message: `New job posted: ${jobId}`,
      targetRole: 'all',
      data: { jobId: job._id, jobTitle: jobId }
    });
    await notification.save();

    // Emit real-time notification
    const io = req.app.get('io');
    if (io) {
      io.emit('new_job', { job });
      io.emit('new_notification', { notification });
    }

    res.status(201).json({ message: 'Job created successfully', job });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all jobs
router.get('/', authenticate, requireApproved, async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    res.json({ jobs });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single job
router.get('/:id', authenticate, requireApproved, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('createdBy', 'name email');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ job });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a job (admin only)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const io = req.app.get('io');
    if (io) {
      io.emit('job_deleted', { jobId: req.params.id });
    }

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

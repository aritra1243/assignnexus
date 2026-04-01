import express from 'express';
import User from '../models/User.js';
import Notification from '../models/Notification.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all pending users (admin only)
router.get('/pending', authenticate, requireAdmin, async (req, res) => {
  try {
    const pendingUsers = await User.find({ isApproved: false, role: 'user' })
      .sort({ createdAt: -1 });
    res.json({ users: pendingUsers });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users (admin only)
router.get('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Approve user (admin only)
router.put('/:id/approve', authenticate, requireAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isApproved = true;
    await user.save();

    // Create notification for the user
    const notification = new Notification({
      type: 'registration_approved',
      message: 'Your account has been approved! You can now access the platform.',
      targetRole: 'user',
      targetUser: user._id,
      data: { userId: user._id }
    });
    await notification.save();

    // Emit real-time notification to the specific user
    const io = req.app.get('io');
    if (io) {
      io.to(`user_${user._id}`).emit('new_notification', { notification });
      io.to(`user_${user._id}`).emit('account_approved');
    }

    res.json({ message: 'User approved successfully', user: user.toJSON() });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Reject user (admin only)
router.put('/:id/reject', authenticate, requireAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create notification before deleting
    const notification = new Notification({
      type: 'registration_rejected',
      message: `Registration rejected for ${user.name} (${user.email})`,
      targetRole: 'admin',
      data: { userName: user.name, userEmail: user.email }
    });
    await notification.save();

    await User.findByIdAndDelete(req.params.id);

    res.json({ message: 'User rejected and removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

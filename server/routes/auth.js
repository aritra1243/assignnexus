import express from 'express';
import passport from 'passport';
import User from '../models/User.js';
import Notification from '../models/Notification.js';
import { authenticate, generateToken } from '../middleware/auth.js';

const router = express.Router();

// Register with email/password
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create user
    const user = new User({
      name,
      email,
      password,
      role: 'user',
      isApproved: false
    });
    await user.save();

    // Create notification for admin
    const notification = new Notification({
      type: 'new_registration',
      message: `New user registration: ${name} (${email})`,
      targetRole: 'admin',
      relatedUser: user._id,
      data: { userName: name, userEmail: email, userId: user._id }
    });
    await notification.save();

    // Emit real-time notification to admins
    const io = req.app.get('io');
    if (io) {
      io.to('admins').emit('new_notification', {
        notification: await notification.populate('relatedUser')
      });
    }

    res.status(201).json({
      message: 'Registration successful! Please wait for admin approval.',
      user: user.toJSON()
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login with email/password
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!user.password) {
      return res.status(400).json({ message: 'Please use Google Sign-In for this account' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check approval (admins bypass)
    if (user.role !== 'admin' && !user.isApproved) {
      return res.status(403).json({ message: 'Your account is pending admin approval' });
    }

    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user: user.toJSON()
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Google OAuth initiate
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false
}));

// Google OAuth callback
router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `${process.env.CLIENT_URL}/signin?error=google_auth_failed` }),
  async (req, res) => {
    try {
      const user = req.user;

      // Check if new user (needs approval) — but still issue token for the "pending" state
      const token = generateToken(user._id);

      if (user.role !== 'admin' && !user.isApproved) {
        // Create notification for admin if brand new
        const existingNotif = await Notification.findOne({
          type: 'new_registration',
          relatedUser: user._id
        });

        if (!existingNotif) {
          const notification = new Notification({
            type: 'new_registration',
            message: `New Google user registration: ${user.name} (${user.email})`,
            targetRole: 'admin',
            relatedUser: user._id,
            data: { userName: user.name, userEmail: user.email, userId: user._id }
          });
          await notification.save();

          const io = req.app.get('io');
          if (io) {
            io.to('admins').emit('new_notification', {
              notification: await notification.populate('relatedUser')
            });
          }
        }

        return res.redirect(`${process.env.CLIENT_URL}/signin?token=${token}&pending=true`);
      }

      res.redirect(`${process.env.CLIENT_URL}/signin?token=${token}`);
    } catch (error) {
      console.error('Google callback error:', error);
      res.redirect(`${process.env.CLIENT_URL}/signin?error=server_error`);
    }
  }
);

// Get current user
router.get('/me', authenticate, async (req, res) => {
  try {
    res.json({ user: req.user.toJSON() });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

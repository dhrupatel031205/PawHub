import { User } from '../models/User.js';

export async function getMe(req, res) {
  const user = await User.findById(req.user.id).select('-passwordHash');
  res.json(user);
}

export async function updateMe(req, res) {
  const allowed = ['name', 'avatarUrl'];
  const updates = {};
  for (const key of allowed) if (key in req.body) updates[key] = req.body[key];
  const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-passwordHash');
  res.json(user);
}

export async function listUsers(_req, res) {
  const users = await User.find().select('-passwordHash');
  res.json(users);
}

export async function getUser(req, res) {
  const user = await User.findById(req.params.id).select('-passwordHash');
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json(user);
}

export async function deleteUser(req, res) {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'User deleted' });
}


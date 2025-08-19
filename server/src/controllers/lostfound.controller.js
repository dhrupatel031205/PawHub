import { LostFound } from '../models/LostFound.js';

export async function listLostFound(req, res) {
  const { type, q } = req.query;
  const filter = {};
  if (type) filter.type = type;
  if (q) filter.description = new RegExp(q, 'i');
  const items = await LostFound.find(filter).sort({ createdAt: -1 });
  res.json(items);
}

export async function createLostFound(req, res) {
  const created = await LostFound.create({ ...req.body, createdBy: req.user.id });
  res.status(201).json(created);
}

export async function updateLostFound(req, res) {
  const item = await LostFound.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
}


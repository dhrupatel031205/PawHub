import { Adoption } from '../models/Adoption.js';

export async function listAdoptions(_req, res) {
  const items = await Adoption.find().populate('animalId').sort({ createdAt: -1 });
  res.json(items);
}

export async function createAdoption(req, res) {
  const created = await Adoption.create({ ...req.body, ownerId: req.user.id });
  res.status(201).json(created);
}

export async function requestAdoption(req, res) {
  const { message } = req.body;
  const adoption = await Adoption.findById(req.params.id);
  if (!adoption) return res.status(404).json({ message: 'Not found' });
  adoption.requests.push({ userId: req.user.id, message });
  await adoption.save();
  res.json(adoption);
}

export async function updateAdoptionStatus(req, res) {
  const { status } = req.body;
  const adoption = await Adoption.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(adoption);
}


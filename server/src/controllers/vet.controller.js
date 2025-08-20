import { Vet } from '../models/Vet.js';

export async function listVets(req, res) {
  const { city, pincode, q } = req.query;
  const filter = {};
  if (city) filter.city = new RegExp(city, 'i');
  if (pincode) filter.pincode = pincode;
  if (q) filter.name = new RegExp(q, 'i');
  const items = await Vet.find(filter).sort({ rating: -1 });
  res.json(items);
}

export async function createVet(req, res) {
  const created = await Vet.create(req.body);
  res.status(201).json(created);
}

export async function getVet(req, res) {
  const item = await Vet.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
}

export async function updateVet(req, res) {
  const item = await Vet.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
}

export async function deleteVet(req, res) {
  const item = await Vet.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
}


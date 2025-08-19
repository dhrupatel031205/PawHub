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


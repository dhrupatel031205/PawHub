import { Animal } from '../models/Animal.js';

export async function createAnimal(req, res) {
  const created = await Animal.create({ ...req.body, createdBy: req.user?.id });
  res.status(201).json(created);
}

export async function listAnimals(req, res) {
  const { species, breed, location, q } = req.query;
  const filter = {};
  if (species) filter.species = species;
  if (breed) filter.breed = breed;
  if (location) filter.location = location;
  if (q) filter.name = new RegExp(q, 'i');
  const items = await Animal.find(filter).sort({ createdAt: -1 });
  res.json(items);
}

export async function getAnimal(req, res) {
  const item = await Animal.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
}

export async function updateAnimal(req, res) {
  const item = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
}

export async function deleteAnimal(req, res) {
  const item = await Animal.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
}


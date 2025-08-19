import dotenv from 'dotenv';
dotenv.config({ override: true });

import bcrypt from 'bcrypt';
import { connectToDatabase } from '../lib/mongo.js';
import { User } from '../models/User.js';
import { Animal } from '../models/Animal.js';
import { Vet } from '../models/Vet.js';
import { Blog } from '../models/Blog.js';
import { Adoption } from '../models/Adoption.js';
import { LostFound } from '../models/LostFound.js';

async function run() {
  await connectToDatabase();

  await Promise.all([
    User.deleteMany({}),
    Animal.deleteMany({}),
    Vet.deleteMany({}),
    Blog.deleteMany({}),
    Adoption.deleteMany({}),
    LostFound.deleteMany({})
  ]);

  const passwordHash = await bcrypt.hash('password123', 10);
  const [admin, vet, user] = await User.create([
    { name: 'Admin', email: 'admin@pawhub.dev', passwordHash, role: 'admin' },
    { name: 'Dr. Paws', email: 'vet@pawhub.dev', passwordHash, role: 'vet' },
    { name: 'Jane Doe', email: 'jane@pawhub.dev', passwordHash, role: 'user' }
  ]);

  const animals = await Animal.create([
    {
      name: 'Bella', species: 'Dog', breed: 'Labrador', age: 3, gender: 'female',
      location: 'Paw City', images: ['https://images.unsplash.com/photo-1558788353-f76d92427f16'],
      habitat: 'Domestic', diet: 'Omnivore', lifespan: '10-12 years',
      funFacts: ['Loves to fetch', 'Great with kids'],
      sounds: ['https://actions.google.com/sounds/v1/animals/dog_growl_and_bark.ogg'],
      status: 'available', createdBy: admin._id
    },
    {
      name: 'Milo', species: 'Cat', breed: 'Siamese', age: 2, gender: 'male',
      location: 'Whisker Town', images: ['https://images.unsplash.com/photo-1518791841217-8f162f1e1131'],
      habitat: 'Domestic', diet: 'Carnivore', lifespan: '12-15 years',
      funFacts: ['Very vocal', 'Loves sunbathing'],
      sounds: ['https://actions.google.com/sounds/v1/animals/cat_purr_close.ogg'],
      status: 'info', createdBy: vet._id
    },
    {
      name: 'Charlie', species: 'Dog', breed: 'Beagle', age: 4, gender: 'male',
      location: 'Paw City', images: ['https://images.unsplash.com/photo-1525253013412-55c1a69a5738'],
      habitat: 'Domestic', diet: 'Omnivore', lifespan: '12-15 years',
      funFacts: ['Excellent sense of smell'], status: 'available', createdBy: admin._id
    },
    {
      name: 'Luna', species: 'Cat', breed: 'British Shorthair', age: 1, gender: 'female',
      location: 'Whisker Town', images: ['https://images.unsplash.com/photo-1511044568932-338cba0ad803'],
      habitat: 'Domestic', diet: 'Carnivore', lifespan: '12-16 years',
      funFacts: ['Calm and affectionate'], status: 'info', createdBy: vet._id
    },
    {
      name: 'Coco', species: 'Parrot', breed: 'Macaw', age: 7, gender: 'unknown',
      location: 'Bird Bay', images: ['https://images.unsplash.com/photo-1501706362039-c06b2d715385'],
      habitat: 'Tropical', diet: 'Herbivore', lifespan: '30-50 years',
      funFacts: ['Can mimic human speech'], status: 'info', createdBy: admin._id
    },
    {
      name: 'Nibbles', species: 'Rabbit', breed: 'Holland Lop', age: 2, gender: 'female',
      location: 'Carrot Creek', images: ['https://images.unsplash.com/photo-1501706362039-c06b2d715385?rabbit'],
      habitat: 'Domestic', diet: 'Herbivore', lifespan: '8-12 years',
      funFacts: ['Ears help regulate temperature'], status: 'available', createdBy: admin._id
    }
  ]);

  const vets = await Vet.create([
    { name: 'Happy Tails Clinic', city: 'Paw City', pincode: '100001', address: '123 Paw St', phone: '+1 555-1000', rating: 4.7 },
    { name: 'Whisker Wellness', city: 'Whisker Town', pincode: '100002', address: '456 Meow Ave', phone: '+1 555-2000', rating: 4.6 },
    { name: 'Bird Bay Vets', city: 'Bird Bay', pincode: '100003', address: '789 Feather Rd', phone: '+1 555-3000', rating: 4.8 },
    { name: 'Carrot Care', city: 'Carrot Creek', pincode: '100004', address: '101 Bunny Blvd', phone: '+1 555-4000', rating: 4.5 }
  ]);

  const blogs = await Blog.create([
    { title: 'Top 10 Tips for New Dog Owners', content: 'Always provide fresh water, regular walks, and training...', category: 'Care', authorId: vet._id },
    { title: 'Why Cats Purr', content: 'Purring can mean happiness, self-healing, or communication...', category: 'Behavior', authorId: admin._id },
    { title: 'Parrot Nutrition Basics', content: 'Parrots need a balanced diet of pellets, fruits, and veggies...', category: 'Nutrition', authorId: vet._id },
    { title: 'Rabbit Housing 101', content: 'Provide enough space, hideouts, and chew toys...', category: 'Care', authorId: admin._id }
  ]);

  // Adoptions for first few animals
  await Adoption.create([
    { animalId: animals[0]._id, ownerId: admin._id, status: 'listed', requests: [] },
    { animalId: animals[2]._id, ownerId: admin._id, status: 'listed', requests: [] },
    { animalId: animals[5]?._id || animals[1]._id, ownerId: user._id, status: 'requested', requests: [{ userId: user._id, message: 'We have a lovely home!' }] }
  ]);

  // Lost & Found entries
  await LostFound.create([
    { type: 'lost', description: 'Missing orange tabby near Central Park', imageUrl: 'https://placehold.co/600x400?lost-cat', location: 'Paw City', contactInfo: '555-1111', createdBy: user._id },
    { type: 'found', description: 'Found small beagle with blue collar', imageUrl: 'https://placehold.co/600x400?found-dog', location: 'Whisker Town', contactInfo: '555-2222', createdBy: admin._id },
    { type: 'lost', description: 'Green parrot flew away near Bird Bay docks', imageUrl: 'https://placehold.co/600x400?lost-parrot', location: 'Bird Bay', contactInfo: '555-3333', createdBy: vet._id }
  ]);

  console.log('Seeded database with demo data.');
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});


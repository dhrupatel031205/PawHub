import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcrypt';
import { connectToDatabase } from '../lib/mongo.js';
import { User } from '../models/User.js';
import { Animal } from '../models/Animal.js';
import { Vet } from '../models/Vet.js';
import { Blog } from '../models/Blog.js';

async function run() {
  await connectToDatabase();

  await Promise.all([
    User.deleteMany({}),
    Animal.deleteMany({}),
    Vet.deleteMany({}),
    Blog.deleteMany({})
  ]);

  const passwordHash = await bcrypt.hash('password123', 10);
  const [admin, vet, user] = await User.create([
    { name: 'Admin', email: 'admin@pawhub.dev', passwordHash, role: 'admin' },
    { name: 'Dr. Paws', email: 'vet@pawhub.dev', passwordHash, role: 'vet' },
    { name: 'Jane Doe', email: 'jane@pawhub.dev', passwordHash, role: 'user' }
  ]);

  await Animal.create([
    {
      name: 'Bella',
      species: 'Dog',
      breed: 'Labrador',
      age: 3,
      gender: 'female',
      location: 'Paw City',
      images: ['https://images.unsplash.com/photo-1558788353-f76d92427f16'],
      habitat: 'Domestic',
      diet: 'Omnivore',
      lifespan: '10-12 years',
      funFacts: ['Loves to fetch', 'Great with kids'],
      sounds: ['https://actions.google.com/sounds/v1/animals/dog_growl_and_bark.ogg'],
      status: 'available',
      createdBy: admin._id
    },
    {
      name: 'Milo',
      species: 'Cat',
      breed: 'Siamese',
      age: 2,
      gender: 'male',
      location: 'Whisker Town',
      images: ['https://images.unsplash.com/photo-1518791841217-8f162f1e1131'],
      habitat: 'Domestic',
      diet: 'Carnivore',
      lifespan: '12-15 years',
      funFacts: ['Very vocal', 'Loves sunbathing'],
      sounds: ['https://actions.google.com/sounds/v1/animals/cat_purr_close.ogg'],
      status: 'info',
      createdBy: vet._id
    }
  ]);

  await Vet.create([
    { name: 'Happy Tails Clinic', city: 'Paw City', pincode: '100001', address: '123 Paw St', phone: '+1 555-1000', rating: 4.7 },
    { name: 'Whisker Wellness', city: 'Whisker Town', pincode: '100002', address: '456 Meow Ave', phone: '+1 555-2000', rating: 4.6 }
  ]);

  await Blog.create([
    { title: 'Top 10 Tips for New Dog Owners', content: 'Always provide fresh water, regular walks, and training...', category: 'Care', authorId: vet._id },
    { title: 'Why Cats Purr', content: 'Purring can mean happiness, self-healing, or communication...', category: 'Behavior', authorId: admin._id }
  ]);

  console.log('Seeded database with demo data.');
  process.exit(0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});


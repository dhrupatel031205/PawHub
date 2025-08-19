import dotenv from 'dotenv';
dotenv.config({ override: true });

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { connectToDatabase } from './lib/mongo.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import animalRoutes from './routes/animal.routes.js';
import adoptionRoutes from './routes/adoption.routes.js';
import lostFoundRoutes from './routes/lostfound.routes.js';
import vetRoutes from './routes/vet.routes.js';
import blogRoutes from './routes/blog.routes.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/', (_req, res) => {
  res.json({ status: 'ok', name: 'PawHub API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/animals', animalRoutes);
app.use('/api/adoptions', adoptionRoutes);
app.use('/api/lostfound', lostFoundRoutes);
app.use('/api/vets', vetRoutes);
app.use('/api/blogs', blogRoutes);

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => console.log(`PawHub API listening on ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to database', err);
    process.exit(1);
  });


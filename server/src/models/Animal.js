import mongoose from 'mongoose';

const AnimalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    species: { type: String, required: true },
    breed: { type: String },
    age: { type: Number },
    gender: { type: String, enum: ['male', 'female', 'unknown'], default: 'unknown' },
    location: { type: String },
    images: [{ type: String }],
    habitat: { type: String },
    diet: { type: String },
    lifespan: { type: String },
    funFacts: [{ type: String }],
    sounds: [{ type: String }],
    status: { type: String, enum: ['available', 'adopted', 'reserved', 'info'], default: 'info' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export const Animal = mongoose.model('Animal', AnimalSchema);


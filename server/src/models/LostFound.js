import mongoose from 'mongoose';

const LostFoundSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['lost', 'found'], required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    location: { type: String },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    },
    contactInfo: { type: String },
    status: { type: String, enum: ['open', 'resolved'], default: 'open' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

export const LostFound = mongoose.model('LostFound', LostFoundSchema);


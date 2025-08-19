import mongoose from 'mongoose';

const VetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String },
    pincode: { type: String },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    rating: { type: Number, default: 4.5 },
    clinicHours: { type: String }
  },
  { timestamps: true }
);

export const Vet = mongoose.model('Vet', VetSchema);


import mongoose from 'mongoose';

const AdoptionSchema = new mongoose.Schema(
  {
    animalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal', required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['listed', 'requested', 'approved', 'rejected', 'completed'], default: 'listed' },
    requests: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        message: { type: String },
        status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

export const Adoption = mongoose.model('Adoption', AdoptionSchema);


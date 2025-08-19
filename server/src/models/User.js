import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin', 'vet'], default: 'user' },
    avatarUrl: { type: String },
    savedAnimalIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }],
    savedBlogIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
  },
  { timestamps: true }
);

export const User = mongoose.model('User', UserSchema);


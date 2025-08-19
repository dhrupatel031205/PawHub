import mongoose from 'mongoose';

export async function connectToDatabase() {
  const envUri = (process.env.MONGODB_URI || '').trim();
  const mongoUri = envUri.length > 0 ? envUri : 'mongodb://127.0.0.1:27017/pawhub';
  mongoose.set('strictQuery', true);
  const preview = mongoUri.startsWith('mongodb+srv') ? 'mongodb+srv://***@' + mongoUri.split('@')[1]?.split('/')[0] : mongoUri;
  console.log(`Connecting to MongoDB: ${preview}`);
  await mongoose.connect(mongoUri, { autoIndex: true });
  const hint = mongoUri.startsWith('mongodb+srv') ? 'atlas' : 'local';
  console.log(`MongoDB connected (${hint})`);
}


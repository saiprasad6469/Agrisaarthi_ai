import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  preferredLanguage: { type: String, default: 'en' },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);

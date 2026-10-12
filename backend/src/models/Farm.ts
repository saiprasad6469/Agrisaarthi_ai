import mongoose from 'mongoose';

export const farmSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  farmSize: { type: Number, required: true, default: 5 },
  location: {
    latitude: { type: Number, default: 18.6725 },
    longitude: { type: Number, default: 78.0941 },
    village: { type: String, default: 'Peddapur' },
    district: { type: String, default: 'Nizamabad' },
    state: { type: String, default: 'Telangana' }
  },
  soilType: { type: String, default: 'Loam' },
  currentCrop: { type: String, default: 'Tomato' },
  currentStage: { type: String, default: 'Vegetative' },
  sowingDate: { type: Date, default: () => new Date(Date.now() - 25 * 86400000) }
});

export const Farm = mongoose.model('Farm', farmSchema);

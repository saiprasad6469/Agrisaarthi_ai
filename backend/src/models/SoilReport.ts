import mongoose from 'mongoose';

export const soilReportSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  fileUrl: { type: String, default: '' },
  fileType: { type: String, default: 'pdf' },
  extractedValues: {
    pH: Number,
    nitrogen: Number,
    phosphorus: Number,
    potassium: Number,
    organicCarbon: Number,
    sulfur: Number,
    zinc: Number,
    iron: Number
  },
  verifiedValues: {
    pH: Number,
    nitrogen: Number,
    phosphorus: Number,
    potassium: Number,
    organicCarbon: Number,
    sulfur: Number,
    zinc: Number,
    iron: Number
  },
  verificationStatus: { type: String, enum: ['pending', 'verified'], default: 'verified' },
  uploadedAt: { type: Date, default: Date.now }
});

export const SoilReport = mongoose.model('SoilReport', soilReportSchema);

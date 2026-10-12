import mongoose from 'mongoose';
import dns from 'dns';
import dotenv from 'dotenv';

dotenv.config();

export async function connectDB(): Promise<boolean> {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/agrisaarthi';

  if (mongoURI.includes('<db_password>')) {
    console.log('----------------------------------------------------');
    console.log('⚠️ MongoDB Atlas URI configured with placeholder: <db_password>');
    console.log('👉 Please edit backend/.env and replace <db_password> with your actual MongoDB Atlas password.');
    console.log('🌾 Running in resilient fallback in-memory mode for now.');
    console.log('----------------------------------------------------');
    return false;
  }

  // Windows / local ISP DNS often fails to resolve MongoDB SRV (_mongodb._tcp) records.
  // Setting public reliable DNS (Google / Cloudflare) guarantees SRV query resolution.
  if (mongoURI.startsWith('mongodb+srv://')) {
    try {
      dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
    } catch (dnsErr) {
      console.warn('Could not set custom DNS servers:', dnsErr);
    }
  }

  try {
    mongoose.set('strictQuery', false);
    console.log('⏳ Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000
    });
    console.log('✅ Connected to MongoDB Atlas successfully.');
    return true;
  } catch (err: any) {
    console.error('⚠️ MongoDB connection error:', err?.message || err);
    console.log('🌾 System operating in resilient in-memory mode.');
    return false;
  }
}


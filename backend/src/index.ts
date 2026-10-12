import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

import { connectDB } from './config/db';

import authRoutes from './routes/authRoutes';
import farmRoutes from './routes/farmRoutes';
import soilRoutes from './routes/soilRoutes';
import labRoutes from './routes/labRoutes';
import cropRoutes from './routes/cropRoutes';
import fertilizerRoutes from './routes/fertilizerRoutes';
import planRoutes from './routes/planRoutes';
import irrigationRoutes from './routes/irrigationRoutes';
import profitRoutes from './routes/profitRoutes';
import marketRoutes from './routes/marketRoutes';
import buyerRoutes from './routes/buyerRoutes';
import assistantRoutes from './routes/assistantRoutes';
import notificationRoutes from './routes/notificationRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads directory
app.use('/uploads', express.static(uploadsDir));

// Connect Database
connectDB();

// API Routes (ONLY Farmer-facing APIs)
app.use('/api/auth', authRoutes);
app.use('/api/farm', farmRoutes);
app.use('/api/soil', soilRoutes);
app.use('/api/labs', labRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/fertilizer', fertilizerRoutes);
app.use('/api/crop-plans', planRoutes);
app.use('/api/irrigation', irrigationRoutes);
app.use('/api/profit', profitRoutes);
app.use('/api/markets', marketRoutes);
app.use('/api/buyers', buyerRoutes);
app.use('/api/assistant', assistantRoutes);
app.use('/api/notifications', notificationRoutes);

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'AgriSaarthi AI', role: 'FARMER_ONLY' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🌾 AgriSaarthi AI Backend running on http://localhost:${PORT}`);
});

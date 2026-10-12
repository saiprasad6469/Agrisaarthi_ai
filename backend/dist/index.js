"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const db_1 = require("./config/db");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const farmRoutes_1 = __importDefault(require("./routes/farmRoutes"));
const soilRoutes_1 = __importDefault(require("./routes/soilRoutes"));
const labRoutes_1 = __importDefault(require("./routes/labRoutes"));
const cropRoutes_1 = __importDefault(require("./routes/cropRoutes"));
const fertilizerRoutes_1 = __importDefault(require("./routes/fertilizerRoutes"));
const planRoutes_1 = __importDefault(require("./routes/planRoutes"));
const irrigationRoutes_1 = __importDefault(require("./routes/irrigationRoutes"));
const profitRoutes_1 = __importDefault(require("./routes/profitRoutes"));
const marketRoutes_1 = __importDefault(require("./routes/marketRoutes"));
const buyerRoutes_1 = __importDefault(require("./routes/buyerRoutes"));
const assistantRoutes_1 = __importDefault(require("./routes/assistantRoutes"));
const notificationRoutes_1 = __importDefault(require("./routes/notificationRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Ensure uploads folder exists
const uploadsDir = path_1.default.join(__dirname, '../uploads');
if (!fs_1.default.existsSync(uploadsDir)) {
    fs_1.default.mkdirSync(uploadsDir, { recursive: true });
}
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Static uploads directory
app.use('/uploads', express_1.default.static(uploadsDir));
// Connect Database
(0, db_1.connectDB)();
// API Routes (ONLY Farmer-facing APIs)
app.use('/api/auth', authRoutes_1.default);
app.use('/api/farm', farmRoutes_1.default);
app.use('/api/soil', soilRoutes_1.default);
app.use('/api/labs', labRoutes_1.default);
app.use('/api/crops', cropRoutes_1.default);
app.use('/api/fertilizer', fertilizerRoutes_1.default);
app.use('/api/crop-plans', planRoutes_1.default);
app.use('/api/irrigation', irrigationRoutes_1.default);
app.use('/api/profit', profitRoutes_1.default);
app.use('/api/markets', marketRoutes_1.default);
app.use('/api/buyers', buyerRoutes_1.default);
app.use('/api/assistant', assistantRoutes_1.default);
app.use('/api/notifications', notificationRoutes_1.default);
// Healthcheck
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'AgriSaarthi AI', role: 'FARMER_ONLY' });
});
// Start Server
app.listen(PORT, () => {
    console.log(`🌾 AgriSaarthi AI Backend running on http://localhost:${PORT}`);
});

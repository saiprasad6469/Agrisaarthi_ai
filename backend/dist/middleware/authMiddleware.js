"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectFarmer = void 0;
const jwt_1 = require("../utils/jwt");
const protectFarmer = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Authorization token required' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = (0, jwt_1.verifyToken)(token);
    if (!decoded || !decoded.userId) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
    req.user = decoded;
    next();
};
exports.protectFarmer = protectFarmer;

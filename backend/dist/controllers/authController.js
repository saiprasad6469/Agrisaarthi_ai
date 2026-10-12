"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultFarmerId = exports.memoryFarms = exports.deleteAccount = exports.updateProfile = exports.getMe = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../utils/jwt");
const models_1 = require("../models");
// Memory fallback store if Mongoose is offline
const memoryUsers = new Map();
const memoryFarms = new Map();
exports.memoryFarms = memoryFarms;
// Seed default demo farmer
const defaultFarmerId = 'farmer-demo-1';
exports.defaultFarmerId = defaultFarmerId;
const defaultHashedPassword = bcryptjs_1.default.hashSync('farmer123', 10);
memoryUsers.set(defaultFarmerId, {
    id: defaultFarmerId,
    _id: defaultFarmerId,
    name: 'Ramesh Kumar',
    mobile: '9876543210',
    email: 'ramesh@farmer.com',
    passwordHash: defaultHashedPassword,
    preferredLanguage: 'en',
    createdAt: new Date()
});
memoryFarms.set(defaultFarmerId, {
    userId: defaultFarmerId,
    farmSize: 5,
    location: {
        latitude: 18.6725,
        longitude: 78.0941,
        village: 'Peddapur',
        district: 'Nizamabad',
        state: 'Telangana'
    },
    soilType: 'Loam',
    currentCrop: 'Tomato',
    currentStage: 'Vegetative',
    sowingDate: new Date(Date.now() - 25 * 86400000)
});
const register = async (req, res) => {
    try {
        const { name, mobile, email, password, state, district, village, farmSize, preferredLanguage } = req.body;
        if (!name || !mobile || !email || !password) {
            return res.status(400).json({ success: false, message: 'Name, mobile, email, and password are required' });
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const passwordHash = await bcryptjs_1.default.hash(password, salt);
        let userId;
        let newUserObj;
        try {
            const existingUser = await models_1.User.findOne({ $or: [{ email }, { mobile }] });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'User with this mobile or email already exists' });
            }
            const createdUser = await models_1.User.create({
                name,
                mobile,
                email,
                passwordHash,
                preferredLanguage: preferredLanguage || 'en'
            });
            userId = createdUser._id.toString();
            newUserObj = createdUser;
            await models_1.Farm.create({
                userId,
                farmSize: Number(farmSize) || 5,
                location: {
                    village: village || 'Peddapur',
                    district: district || 'Nizamabad',
                    state: state || 'Telangana'
                }
            });
        }
        catch (dbErr) {
            // Memory fallback
            for (const u of memoryUsers.values()) {
                if (u.email === email || u.mobile === mobile) {
                    return res.status(400).json({ success: false, message: 'User with this mobile or email already exists' });
                }
            }
            userId = 'user-' + Date.now();
            newUserObj = {
                id: userId,
                _id: userId,
                name,
                mobile,
                email,
                passwordHash,
                preferredLanguage: preferredLanguage || 'en',
                createdAt: new Date()
            };
            memoryUsers.set(userId, newUserObj);
            memoryFarms.set(userId, {
                userId,
                farmSize: Number(farmSize) || 5,
                location: {
                    latitude: 18.6725,
                    longitude: 78.0941,
                    village: village || 'Peddapur',
                    district: district || 'Nizamabad',
                    state: state || 'Telangana'
                },
                soilType: 'Loam',
                currentCrop: 'Tomato',
                currentStage: 'Vegetative',
                sowingDate: new Date()
            });
        }
        const token = (0, jwt_1.generateToken)(userId, mobile, email);
        return res.status(201).json({
            success: true,
            message: 'Farmer registration successful',
            token,
            user: {
                id: userId,
                name,
                mobile,
                email,
                preferredLanguage: preferredLanguage || 'en'
            }
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message || 'Server error during registration' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { loginInput, mobile, email, password } = req.body;
        const identifier = loginInput || mobile || email;
        if (!identifier || !password) {
            return res.status(400).json({ success: false, message: 'Mobile/email and password are required' });
        }
        let foundUser = null;
        try {
            foundUser = await models_1.User.findOne({
                $or: [{ email: identifier }, { mobile: identifier }]
            });
        }
        catch (dbErr) {
            // Memory fallback
            for (const u of memoryUsers.values()) {
                if (u.email === identifier || u.mobile === identifier) {
                    foundUser = u;
                    break;
                }
            }
        }
        if (!foundUser && (identifier === '9876543210' || identifier === 'ramesh@farmer.com')) {
            foundUser = memoryUsers.get(defaultFarmerId);
        }
        if (!foundUser) {
            return res.status(400).json({ success: false, message: 'Invalid mobile/email or password' });
        }
        const isMatch = await bcryptjs_1.default.compare(password, foundUser.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid mobile/email or password' });
        }
        const userId = foundUser._id ? foundUser._id.toString() : foundUser.id;
        const token = (0, jwt_1.generateToken)(userId, foundUser.mobile, foundUser.email);
        return res.json({
            success: true,
            message: 'Farmer login successful',
            token,
            user: {
                id: userId,
                name: foundUser.name,
                mobile: foundUser.mobile,
                email: foundUser.email,
                preferredLanguage: foundUser.preferredLanguage || 'en'
            }
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message || 'Server error during login' });
    }
};
exports.login = login;
const getMe = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId)
            return res.status(401).json({ success: false, message: 'Not authenticated' });
        let user = null;
        try {
            user = await models_1.User.findById(userId).select('-passwordHash');
        }
        catch (dbErr) {
            user = memoryUsers.get(userId);
        }
        if (!user && memoryUsers.has(userId)) {
            user = memoryUsers.get(userId);
        }
        if (!user) {
            return res.status(404).json({ success: false, message: 'Farmer account not found' });
        }
        return res.json({
            success: true,
            user: {
                id: user._id ? user._id.toString() : user.id,
                name: user.name,
                mobile: user.mobile,
                email: user.email,
                preferredLanguage: user.preferredLanguage || 'en'
            }
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getMe = getMe;
const updateProfile = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const { name, mobile, email, preferredLanguage } = req.body;
        if (!userId)
            return res.status(401).json({ success: false, message: 'Not authenticated' });
        try {
            const updated = await models_1.User.findByIdAndUpdate(userId, { name, mobile, email, preferredLanguage }, { new: true }).select('-passwordHash');
            if (updated) {
                return res.json({ success: true, message: 'Profile updated successfully', user: updated });
            }
        }
        catch (dbErr) {
            // Fallback
        }
        const mem = memoryUsers.get(userId);
        if (mem) {
            if (name)
                mem.name = name;
            if (mobile)
                mem.mobile = mobile;
            if (email)
                mem.email = email;
            if (preferredLanguage)
                mem.preferredLanguage = preferredLanguage;
            memoryUsers.set(userId, mem);
            return res.json({ success: true, message: 'Profile updated successfully', user: mem });
        }
        return res.status(404).json({ success: false, message: 'Farmer account not found' });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.updateProfile = updateProfile;
const deleteAccount = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId)
            return res.status(401).json({ success: false, message: 'Not authenticated' });
        try {
            await models_1.User.findByIdAndDelete(userId);
            await models_1.Farm.deleteMany({ userId });
        }
        catch (dbErr) {
            memoryUsers.delete(userId);
            memoryFarms.delete(userId);
        }
        return res.json({ success: true, message: 'Farmer account deleted' });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteAccount = deleteAccount;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profitController_1 = require("../controllers/profitController");
const router = (0, express_1.Router)();
router.post('/calculate', profitController_1.calculateProfit);
exports.default = router;

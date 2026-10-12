"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const irrigationController_1 = require("../controllers/irrigationController");
const router = (0, express_1.Router)();
router.post('/recommend', irrigationController_1.recommendIrrigation);
exports.default = router;

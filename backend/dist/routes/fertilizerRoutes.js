"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fertilizerController_1 = require("../controllers/fertilizerController");
const router = (0, express_1.Router)();
router.post('/recommend', fertilizerController_1.recommendFertilizers);
exports.default = router;

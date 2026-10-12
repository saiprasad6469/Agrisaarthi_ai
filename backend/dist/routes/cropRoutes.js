"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cropController_1 = require("../controllers/cropController");
const router = (0, express_1.Router)();
router.get('/', cropController_1.getCrops);
router.get('/:id', cropController_1.getCropById);
router.post('/recommend', cropController_1.recommendCropList);
exports.default = router;

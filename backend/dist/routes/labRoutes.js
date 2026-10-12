"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const labController_1 = require("../controllers/labController");
const router = (0, express_1.Router)();
router.get('/', labController_1.getSoilLabs);
router.get('/nearby', labController_1.getSoilLabs);
router.get('/:id', labController_1.getSoilLabById);
exports.default = router;

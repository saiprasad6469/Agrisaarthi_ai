"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const buyerController_1 = require("../controllers/buyerController");
const router = (0, express_1.Router)();
router.get('/', buyerController_1.getBuyers);
exports.default = router;

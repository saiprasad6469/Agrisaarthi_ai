"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const marketController_1 = require("../controllers/marketController");
const router = (0, express_1.Router)();
router.get('/', marketController_1.getMarkets);
router.get('/prices', marketController_1.getPrices);
exports.default = router;

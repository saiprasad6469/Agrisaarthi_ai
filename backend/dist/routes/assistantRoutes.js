"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const assistantController_1 = require("../controllers/assistantController");
const router = (0, express_1.Router)();
router.post('/chat', assistantController_1.chatWithAssistant);
exports.default = router;

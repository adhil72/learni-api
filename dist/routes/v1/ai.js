"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RequestHandler_1 = __importDefault(require("../../Helpers/RequestHandler"));
const ai_service_1 = require("../../services/ai.service");
const router = (0, express_1.Router)();
router.post('/explain', (req, res) => (0, RequestHandler_1.default)(req, res, ai_service_1.explainService));
exports.default = router;

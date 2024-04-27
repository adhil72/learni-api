"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RequestHandler_1 = __importDefault(require("../../Helpers/RequestHandler"));
const chat_service_1 = require("../../services/chat.service");
const router = (0, express_1.Router)();
router.post('/create', async (req, res) => (0, RequestHandler_1.default)(req, res, chat_service_1.createChatService));
router.get('/get', async (req, res) => (0, RequestHandler_1.default)(req, res, chat_service_1.getChatService));
router.get('/get/generations', async (req, res) => (0, RequestHandler_1.default)(req, res, chat_service_1.getChatGenerationsService));
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = require("../../services/auth.service");
const RequestHandler_1 = __importDefault(require("../../Helpers/RequestHandler"));
const router = (0, express_1.Router)();
router.post('/', (req, res) => (0, RequestHandler_1.default)(req, res, auth_service_1.authService));
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const files_service_1 = __importDefault(require("../../services/files.service"));
const router = (0, express_1.Router)();
router.get('/', files_service_1.default.getFile);
exports.default = router;

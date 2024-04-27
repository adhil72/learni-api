import { Router } from "express";
import RequestHandler from "../../Helpers/RequestHandler";
import { createChatService, getChatService, getChatGenerationsService } from "../../services/chat.service";

const router = Router()

router.post('/create', async (req, res) => RequestHandler(req, res, createChatService))
router.get('/get', async (req, res) => RequestHandler(req, res, getChatService))
router.get('/get/generations', async (req, res) => RequestHandler(req, res, getChatGenerationsService))

export default router;
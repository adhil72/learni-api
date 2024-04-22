import { Router } from 'express';
import RequestHandler from '../../Helpers/RequestHandler';
import { explainService } from "../../services/ai.service"

const router = Router();

router.post('/explain', (req, res) => RequestHandler(req, res, explainService))

export default router;
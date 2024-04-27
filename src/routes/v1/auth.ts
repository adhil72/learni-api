import { Router } from "express";
import { authService } from "../../services/auth.service";
import RequestHandler from "../../Helpers/RequestHandler";

const router = Router();

router.post('/', (req, res) => RequestHandler(req, res, authService))

export default router;

import { Router } from "express";
import filesService from "../../services/files.service";

const router = Router();
router.get('/', filesService.getFile)

export default router;
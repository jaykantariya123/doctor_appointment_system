import { Router } from "express";
const router = Router();
import { getInfoController } from "../controllers/userControllers.js";

router.get("/getInfo/:userId", getInfoController);

export default router;

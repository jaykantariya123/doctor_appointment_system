import { Router } from "express";
const router = Router();

import { bookAppointmentController} from "../controllers/appointmentControllers.js";

router.post("/book-appointment", bookAppointmentController);

export default router;
import { Router } from "express";
const router = Router();

import { bookAppointmentController,getappointmentController} from "../controllers/appointmentControllers.js";

router.post("/book-appointment", bookAppointmentController);

router.post("/getInfo", getappointmentController);

export default router;
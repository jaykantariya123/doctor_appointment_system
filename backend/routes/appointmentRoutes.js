import { Router } from "express";
const router = Router();

import { bookAppointmentController,getappointmentController, verifyAppointmentController} from "../controllers/appointmentControllers.js";

router.post("/verify-appointment", verifyAppointmentController);

router.post("/book-appointment", bookAppointmentController);

router.post("/getInfo", getappointmentController);

export default router;
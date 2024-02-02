import {Router } from 'express';
import { addDoctorInfoController,existdoctorController,getAllDoctorController, updateDoctorInfoController } from "../controllers/doctorControllers.js";
const router=Router();


router.post("/apply-doctor", addDoctorInfoController);

router.get("/getAllDoctor", getAllDoctorController);

router.put("/updatedoctorInfo",updateDoctorInfoController);

router.get("/existDoctor/:userId", existdoctorController);

export default router;
import mongoose from "mongoose";
import doctorModel from "../models/doctorModels.js";

export const addDoctorInfoController = async (req, res) => {
  try {
    const doctor = req.body;
    // console.log(doctor.user);
    doctor.userId = new mongoose.Types.ObjectId(doctor.userId);
    const checkDoctor = await doctorModel.findOne({
      userId: doctor.userId,
    });
    // console.log(checkUser);
    if (checkDoctor) {
      return res.status(200).send({
        message: "Doctor Already Exists",
        success: false,
      });
    }

    console.log(doctor);
    const newDoctor = new doctorModel(doctor);
    const resp = await newDoctor.save();
    res.status(201).send({
      message: "Doctor register successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: `Register in doctor Controller : ${error.message}`,
      success: false,
    });
  }
};

export const getAllDoctorController = async (req, res) => {
  try {
    const doctorList = await doctorModel.find().populate("userId");
    // console.log(doctorList);

    res.status(200).send({
      success: true,
      message: "doctor list fetched successfully",
      doctorList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while fetching notifications",
    });
  }
};

export const updateDoctorInfoController = async (req, res) => {
  const userId = req.body.userId;
  const updateData = req.body;

  try {
    const updatedDoctor = await doctorModel.findOneAndUpdate(
      { userId: userId },
      updateData
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(updatedDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const existdoctorController = async (req, res) => {
  const userId = req.params.userId;
  try {
    const existingDoctor = await doctorModel.findOne({ userId });
    res.json({ exists: !!existingDoctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const getDoctorInfoController = async (req, res) => {
//   try {
//     const doctor = await doctorModel
//       .findOne({ user: req.body.userId })
//       .populate("user");
//     console.log(doctor);
//     res.status(200).send({
//       success: true,
//       message: "doctor data fetch successfully",
//       doctor,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "error in fetching doctor details",
//     });
//   }
// };

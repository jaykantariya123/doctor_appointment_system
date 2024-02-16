import appointmentModel from "../models/appointmentModels.js";

export const bookAppointmentController = async (req, res) => {
  try {
    console.log(req.body);
    const { date, time, doctor } = req.body;

    // doctor.userId = new mongoose.Types.ObjectId(doctor.userId);
    const checkAppointment = await appointmentModel.findOne({
      doctor: doctor,
      time: time,
      date: date,
    });
    if (checkAppointment) {
      return res.status(200).send({
        message: "This slot already booked,Sorry !!!",
        success: false,
      });
    }
    // console.log(doctor);
    const newAppointment = new appointmentModel(req.body);
    const resp = await newAppointment.save();
    res.status(201).send({
      message: "Appointment Book successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: `Appointment book error : ${error.message}`,
      success: false,
    });
  }
};

export const getappointmentController = async (req, res) => {
  try {
    const { user } = req.body;
    const Appointment = await appointmentModel
      .find({
        user: user,
      })
      .populate("doctor");

    res.status(200).send({
      success: true,
      message: "appointment list fetched successfully",
      Appointment,
    });
  } catch (error) {
    return res.status(500).send({
      message: `getInfo Controller : ${error.message}`,
      success: false,
    });
  }
};

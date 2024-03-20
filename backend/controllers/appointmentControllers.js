import appointmentModel from "../models/appointmentModels.js";

export const verifyAppointmentController = async (req, res) => {
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
        // message: "This slot already booked,Sorry !!!",
        success: false,
      });
    } else {
      return res.status(200).send({
        success: true,
      });
    }
    // console.log(doctor);
    // const newAppointment = new appointmentModel(req.body);
    // const resp = await newAppointment.save();
    // res.status(201).send({
    //   message: "Appointment Book successfully",
    //   success: true,
    // });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: `Appointment book error : ${error.message}`,
      success: false,
    });
  }
};

export const bookAppointmentController = async (req, res) => {
  try {
    console.log(req.body);
    const { date, time } = req.body;

    // doctor.userId = new mongoose.Types.ObjectId(doctor.userId);
    // const checkAppointment = await appointmentModel.findOne({
    //   doctor: doctor,
    //   time: time,
    //   date: date,
    // });
    if (date == "-" && time == "-") {
      console.log("helo");
      return res.status(200).send({
        message: "payment not done successfully",
        success: false,
      });
    } else {
      const newAppointment = new appointmentModel(req.body);
      const resp = await newAppointment.save();
      res.status(201).send({
        message: "Appointment Book successfully",
        success: true,
      });
    }
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
      .populate({
        path: "doctor",
        populate: {
          path: "userId",
          model: "user",
        },
      });

    res.status(200).send({
      success: true,
      message: "appointment list fetched successfully",
      Appointment: Appointment,
    });
  } catch (error) {
    return res.status(500).send({
      message: `getInfo Controller : ${error.message}`,
      success: false,
    });
  }
};

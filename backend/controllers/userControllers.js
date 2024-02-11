import userModel from "../models/userModels.js";
import doctorModel from "../models/doctorModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import CryptoJS from "crypto-js";
import appointmentModel from "../models/appointmentModels.js";

// login call back
export const loginController = async (req, res) => {
  // const { encryptedObj } = req.body;
  // console.log(process.env.CRYPTO_SECRET_KEY)

  try {
    // const { email, password } = decryptData(encryptedObj);
    const { email, password } = req.body;
    //console.log({ email, password });
    const user = await userModel.findOne({ email });
    if (user) {
      //console.log(password);
      const isMatch = await bcrypt.compare(password, user.password);
      if (false === isMatch) {
        return res.status(200).send({
          message: "invalid credationals",
          success: false,
        });
      } else {
        var userType = "user";
        if (user.isDoctor) userType = "doctor";
        else if (user.isAdmin) userType = "admin";
        const token = jwt.sign(
          { id: user._id, userType },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        return res.status(200).send({
          message: "Login successfully",
          token,
          success: true,
        });
      }
    } else {
      res.status(200).send({
        message: "invalid credationals",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: `Login Controller : ${error.message}`,
      success: false,
    });
  }
};

export const registerController = async (req, res) => {
  //console.log(typeof req.body);
  try {
    // const { encryptedObj } = req.body;
    // const bytes = CryptoJS.AES.decrypt(
    //   encryptedObj,
    //   process.env.CRYPTO_SECRET_KEY
    // );
    // const { user } = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const user = req.body;
    console.log(user);
    const checkUser = await userModel.findOne({
      $or: [{ email: user.email }, { phone: user.phone }],
    });
    // console.log(checkUser);
    if (checkUser) {
      return res.status(200).send({
        message: "User Already Exists",
        success: false,
      });
    }

    user.password = await bcrypt.hash(user.password, 10);
    const newUser = new userModel(user);
    const resp = await newUser.save();
    // console.log(resp);
    res.status(201).send({
      message: "register successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: `Register Controller : ${error.message}`,
      success: false,
    });
  }
};


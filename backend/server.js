import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import {
  registerController,
  loginController,
} from "./controllers/userControllers.js";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGO_URL;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

connectDB();

const PORT = process.env.PORT || 8080;

// listen port
app.listen(PORT, () => {
  console.log("server is litening", PORT);
});

// LOGIN || post
app.post("/api/user/login", loginController);

// REGISTER || post
app.post("/api/user/register", registerController);

import express from "express";
import dotenv from "dotenv";
import connectDb from "./utils/db.js";
import userRoutes from "./routes/user.js";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors"
dotenv.config();

cloudinary.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Cloud_Api_key,
  api_secret: process.env.Cloud_Api_secret,
});

const port = process.env.PORT;
const app = express();

connectDb();

app.use(express.json());
app.use(cors())
app.use("/api/v1", userRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

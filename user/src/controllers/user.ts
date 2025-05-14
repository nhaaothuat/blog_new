import User from "../model/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import TryCatch from "../utils/TryCatch.js";
import { AuthenticatedRequest } from "../middleware/isAuth.js";
dotenv.config();

export const loginUser = TryCatch(async (req, res) => {
  const { email, name, image } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({
      name,
      email,
      image,
    });
  }

  const token = jwt.sign({ user }, process.env.JWT_SEC as string, {
    expiresIn: "5d",
  });

  res.status(200).json({
    message: "Login success",
    token,
    user,
  });
});

export const myProfile = TryCatch(async (req: AuthenticatedRequest, res) => {
  const user = req.user;

  res.json(user);
});

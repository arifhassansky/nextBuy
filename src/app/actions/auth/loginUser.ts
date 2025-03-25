"use server";
import dbConnect, { dbName } from "@/lib/DbConnect";
import bcrypt from "bcryptjs";

const LoginUser = async (payload) => {
  const { email, password } = payload;

  const userCollection = await dbConnect(dbName.usersCollection);
  const user = await userCollection.findOne({ email });
  if (!user) return { error: "User not found" };

  const isPasswordOk = await bcrypt.compare(password, user.password);
  if (!isPasswordOk) return { error: "Incorrect password" };

  return user;
};

export default LoginUser;

"use server";
import dbConnect, { dbName } from "@/lib/DbConnect";
import bcrypt from "bcryptjs";

const registerUser = async (payload) => {
  const userCollection = await dbConnect(dbName.usersCollection);

  //   validation for frontend
  const { email, password } = payload;
  if (!email || !password) return;

  //   validation for frontend
  const isexists = await userCollection.findOne({ email: payload.email });
  if (isexists) return;

  //   bcrypt password
  const hashedPassword = await bcrypt.hash(password, 10);
  payload.password = hashedPassword;

  const result = await userCollection.insertOne(payload);
  result.insertedId.toString();
  return result;
};
export default registerUser;

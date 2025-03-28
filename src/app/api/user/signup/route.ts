import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/config/db/connectDB";
import User from "@/models/user.model/user.model";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { name, email, password, role } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });

    await newUser.save();
    console.log(newUser);

    return NextResponse.json(
      {
        status: 201,
        success: true,
        message: "User registered successfully",
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

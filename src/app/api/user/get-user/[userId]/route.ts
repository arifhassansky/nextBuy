import connectDB from "@/config/db/connectDB";
import User from "@/models/user.model/user.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();
    // Parse the URL
    const url = new URL(req.url);
    const userEmail = url.pathname.split("/").pop();

    console.log("Received userEmail:", userEmail);

    const findUser = await User.findOne({ email: userEmail });

    if (!findUser) {
      return NextResponse.json(
        {
          status: 404,
          success: false,
          message: "FindUser not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: 200,
        success: true,
        message: "FindUser retrieved successfully",
        data: findUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching findUser:", error);
    return NextResponse.json(
      {
        status: 500,
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

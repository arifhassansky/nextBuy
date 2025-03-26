import connectDB from "@/config/db/connectDB";
import Blog from "@/models/blog.model/blog.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();
    // Parse the URL
    const url = new URL(req.url);
    const blogId = url.pathname.split("/").pop(); // Extract blogId from the URL path

    console.log("Received blogId:", blogId);

    const blog = await Blog.findOne({ slug: blogId });

    if (!blog) {
      return NextResponse.json(
        {
          status: 404,
          success: false,
          message: "Blog not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: 200,
        success: true,
        message: "Blog retrieved successfully",
        data: blog,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blog:", error);
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

import connectDB from "@/config/db/connectDB";
import Blog from "@/models/blog.model/blog.model";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { title, content, author, authorImage, image, category } =
      await req.json();

    if (!title || !content || !author || !image || !authorImage) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }
    const blogs = new Blog({
      title,
      content,
      author,
      authorImage,
      image,
      category,
      slug: slugify(title).toLocaleLowerCase(),
    });

    await blogs.save();

    return NextResponse.json(
      {
        status: 201,
        success: true,
        message: "Blog created successfully",
        data: blogs,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
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

export async function GET(req: Request) {
  try {
    await connectDB();

    // Extract query parameters correctly
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "6", 10);

    const products = await Blog.find()
      .skip((page - 1) * limit) // Corrected pagination logic
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("category");

    return NextResponse.json(
      {
        status: 200,
        success: true,
        message: "Blog retrieved successfully",
        data: products,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching products:", error);
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

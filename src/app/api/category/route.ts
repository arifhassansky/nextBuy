import connectDB from "@/config/db/connectDB";
import Category from "@/models/category.model/category.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const session = await getServerSession();
    const user = session?.user;

    if (!user) {
      return NextResponse.json(
        {
          status: 401,
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const { name, description, image } = await req.json();

    if (!name || !description || !image) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    const isExist = await Category.findOne({ name });
    if (isExist) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          message: "Category already exists",
        },
        { status: 400 }
      );
    }

    const newCategory = new Category({
      name,
      description,
      image,
    });
    console.log(newCategory);

    await newCategory.save();

    return NextResponse.json(
      {
        status: 201,
        success: true,
        message: "Category created successfully",
        data: newCategory,
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

    const { searchParams } = new URL(req.url);
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1); // Default to 1, min 1
    const limit = Math.max(parseInt(searchParams.get("limit") || "5", 5), 1); // Default to 10, min 1

    // Fetch products with pagination and sorting
    const categories = await Category.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Construct the response
    const response = {
      status: 200,
      success: true,
      message: "Categories retrieved successfully",
      data: categories,
      pagination: {
        totalItems: categories.length,
        currentPage: page,
        perPage: limit,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
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

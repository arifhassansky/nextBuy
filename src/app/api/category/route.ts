import connectDB from "@/config/db/connectDB";
import Category from "@/models/category.model/category.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

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

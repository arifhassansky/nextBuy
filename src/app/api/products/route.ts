import connectDB from "@/config/db/connectDB";
import Product from "@/models/product.model/product.model";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { title, price, description, image, category, quantity } =
      await req.json();

    if (!title || !price || !description || !image || !category || !quantity) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }
    const product = new Product({
      title,
      price,
      description,
      image,
      category,
      quantity,
      slug: slugify(title).toLocaleLowerCase(),
    });

    await product.save();

    return NextResponse.json(
      {
        status: 201,
        success: true,
        message: "Product created successfully",
        data: product,
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

    // Extract query parameters correctly from the request URL
    const { searchParams } = new URL(req.url);

    // Parse pagination values properly
    const page = parseInt(searchParams.get("page") || "1", 10); // Default to 1
    const limit = parseInt(searchParams.get("limit") || "6", 10); // Default to 6

    // Ensure valid pagination values
    const currentPage = Math.max(page, 1); // Ensure page is at least 1
    const perPage = Math.max(limit, 1); // Ensure limit is at least 1

    console.log(`Page: ${currentPage}, Limit: ${perPage}`);

    // Fetch products with pagination
    const products = await Product.find()
      .skip((currentPage - 1) * perPage) // Correct pagination calculation
      .limit(perPage)
      .sort({ createdAt: -1 })
      .populate("category");

    // Get total count of products (for pagination metadata)
    const totalProducts = await Product.countDocuments();

    return NextResponse.json(
      {
        status: 200,
        success: true,
        message: "Products retrieved successfully",
        data: products,
        pagination: {
          totalItems: totalProducts,
          totalPages: Math.ceil(totalProducts / perPage),
          currentPage,
          perPage,
        },
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

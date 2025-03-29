import connectDB from "@/config/db/connectDB";
import Product from "@/models/product.model/product.model";
import { NextResponse } from "next/server";
import slugify from "slugify";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  try {
    await connectDB();

    const {
      title,
      price,
      description,
      image,
      images,
      category,
      quantity,
      sellerId,
    } = await req.json();
    // console.log(images);
    if (
      !title ||
      !price ||
      !description ||
      !image ||
      !category ||
      !quantity ||
      sellerId
    ) {
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
      images,
      category,
      quantity,
      sellerId,
      slug: `${slugify(title).toLocaleLowerCase()}-${nanoid(
        7
      ).toLocaleLowerCase()}`,
    });
    console.log(product);

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

    // Extract query parameters from the request URL
    const { searchParams } = new URL(req.url);
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1); // Default to 1, min 1
    const limit = Math.max(parseInt(searchParams.get("limit") || "10", 10), 1); // Default to 10, min 1
    const search = searchParams.get("search") || "";

    // Build the query dynamically
    const searchQuery = search ? new RegExp(search, "i") : null;
    const query = searchQuery
      ? {
          $or: [
            { title: searchQuery },
            { description: searchQuery },
            { category: searchQuery },
          ],
        }
      : {};

    console.log(`Page: ${page}, Limit: ${limit}, Search: ${search}`);

    // Fetch products with pagination and sorting
    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("category");

    // Get total count for pagination metadata
    const totalProducts = await Product.countDocuments(query);

    // Construct the response
    const response = {
      status: 200,
      success: true,
      message: "Products retrieved successfully",
      data: products,
      pagination: {
        totalItems: totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: page,
        perPage: limit,
      },
    };

    return NextResponse.json(response, { status: 200 });
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

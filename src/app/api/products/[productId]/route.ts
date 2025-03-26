import connectDB from "@/config/db/connectDB";
import Product from "@/models/product.model/product.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();
    // Parse the URL
    const url = new URL(req.url);
    const productId = url.pathname.split("/").pop(); // Extract productId from the URL path

    console.log("Received productId:", productId);

    const product = await Product.findOne({ slug: productId }).populate(
      "category"
    );

    if (!product) {
      return NextResponse.json(
        {
          status: 404,
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: 200,
        success: true,
        message: "Product retrieved successfully",
        data: product,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching product:", error);
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

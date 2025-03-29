import connectDB from "@/config/db/connectDB";
import Product from "@/models/product.model/product.model";
import Store from "@/models/store.model/store.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();
    // Parse the URL
    const url = new URL(req.url);
    const storeId = url.pathname.split("/").pop(); // Extract storeId from the URL path

    console.log("Received storeId:", storeId);

    const store = await Store.findOne({ slug: storeId });

    const findAllProducts = await Product.find({ storeId: store?._id });

    if (!store || !findAllProducts) {
      return NextResponse.json(
        {
          status: 404,
          success: false,
          message: `${!store ? "Store not found" : ""} ${
            !findAllProducts ? "Products not found" : ""
          }`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: 200,
        success: true,
        message: "Products retrieved successfully",
        data: findAllProducts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching Products:", error);
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

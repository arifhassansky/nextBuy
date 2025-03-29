import connectDB from "@/config/db/connectDB";
import Store from "@/models/store.model/store.model";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { name, category, sellerId, destruction, address, coverImage } =
      await req.json();
    if (!name || !category || !destruction || !address || !coverImage) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          message: "All Store fields are required",
        },
        { status: 400 }
      );
    }

    const findSeller = await Store.findOne({ sellerId });

    if (findSeller) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          message: "Seller already has a store",
        },
        { status: 400 }
      );
    }

    const store = new Store({
      name,
      category,
      sellerId: findSeller?._id,
      destruction,
      address: {
        street: address.street,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
      },
      coverImage,
    });

    await store.save();

    return NextResponse.json(
      {
        status: 201,
        success: true,
        message: "Store created successfully",
        data: store,
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

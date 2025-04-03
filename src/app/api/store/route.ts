import connectDB from "@/config/db/connectDB";
import Store from "@/models/store.model/store.model";
import User from "@/models/user.model/user.model";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const session = await getServerSession();
    const user = session?.user;

    // Uncomment this if you want to enforce authentication

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

    const findUser = await User.findOne({ email: "himelmia1625@gmail.com" });

    if (!findUser) {
      return NextResponse.json(
        {
          status: 401,
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

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
      sellerId: sellerId,
      destruction,
      address: {
        street: address.street,
        city: address.city,
        postalCode: address.postalCode,
        country: address.country,
      },
      coverImage,
    });
    findUser.storeId = store._id;
    await store.save();

    console.log(store);

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

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1); // Default to 1, min 1
    const limit = Math.max(parseInt(searchParams.get("limit") || ""));

    // Fetch products with pagination and sorting
    const stores = await Store.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Construct the response
    const response = {
      status: 200,
      success: true,
      message: "Stores retrieved successfully",
      data: stores,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching stores:", error);
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

export async function PUT(req: Request) {
  try {
    await connectDB();

    const session = await getServerSession();
    const user = session?.user;
    console.log(user);
    // Uncomment this if you want to enforce authentication
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

    const { userEmail } = await req.json();

    // Fetch products with pagination and sorting
    const stores = await Store.find({ sellerId: userEmail });

    console.log(stores);
    // Construct the response
    const response = {
      status: 200,
      success: true,
      message: "Stores retrieved successfully",
      data: stores,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching stores:", error);
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

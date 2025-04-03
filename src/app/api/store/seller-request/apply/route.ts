import connectDB from "@/config/db/connectDB";
import SellerRequest from "@/models/seller-request/sellerRequest.model";
import User from "@/models/user.model/user.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { userEmail } = await req.json();
    const session = await getServerSession();
    const user = session?.user;

    //   // Uncomment this if you want to enforce authentication

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
    console.log(userEmail);

    const findUser = await User.findOne({ email: userEmail });

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

    const applySeller = await SellerRequest.findOne({ userId: findUser._id });

    if (applySeller) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          message: "You already applied for a seller",
        },
        { status: 400 }
      );
    }

    const store = new SellerRequest({
      userId: findUser._id,
      status: "pending",
    });

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

    const session = await getServerSession();
    const user = session?.user;

    // // Uncomment this if you want to enforce authentication
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

    const { searchParams } = new URL(req.url);
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1); // Default to 1, min 1
    const limit = Math.max(parseInt(searchParams.get("limit") || ""));

    // Fetch products with pagination and sorting
    const sellerReq = await SellerRequest.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Construct the response
    const response = {
      status: 200,
      success: true,
      message: "Stores retrieved successfully",
      data: sellerReq,
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

    const { userId, userEmail, role, status } = await req.json();

    // Fetch products with pagination and sorting
    const sellerReq = await SellerRequest.findOne({ userId });
    const findUser = await User.findOne({ email: userEmail });

    sellerReq.status = status;
    findUser.role = role;

    await sellerReq.save();
    await findUser.save();

    console.log(sellerReq);
    // Construct the response
    const response = {
      status: 200,
      success: true,
      message: "Seller request updated successfully",
      data: sellerReq,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching stores:", error);
    return NextResponse.json(
      {
        status: 500,
        success: false,
        message: "Something went wrong",
        error: error,
      },
      { status: 500 }
    );
  }
}

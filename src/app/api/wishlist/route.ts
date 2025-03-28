import connectDB from "@/config/db/connectDB";
import Wishlist, {
  IWishlist,
  IWishlistItem,
} from "@/models/wishlist.model/wishlist.model";
import { NextResponse } from "next/server";

interface WishlistRequestBody {
  userEmail: string;
  items: {
    productId: string;
  };
}

interface WishlistResponse {
  status: number;
  success: boolean;
  message: string;
  data?: IWishlist;
}

export async function POST(
  req: Request
): Promise<NextResponse<WishlistResponse>> {
  try {
    await connectDB();

    const { userEmail, items }: WishlistRequestBody = await req.json();

    if (!userEmail || !items || !items.productId) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          message: "All fields (userEmail, productId) are required",
        },
        { status: 400 }
      );
    }

    // Check if wishlist already exists for this user
    let wishlist: IWishlist | null = await Wishlist.findOne({ userEmail });

    if (wishlist) {
      // Wishlist exists, check if product already in wishlist
      const existingItemIndex = wishlist.items.findIndex(
        (item: IWishlistItem) => item.productId.toString() === items.productId
      );

      if (existingItemIndex > -1) {
        return NextResponse.json(
          {
            status: 200,
            success: true,
            message: "Product already in wishlist",
            data: wishlist,
          },
          { status: 200 }
        );
      } else {
        wishlist.items.push({
          productId: items.productId,
          addedAt: new Date(),
        });
        await wishlist.save();
      }
    } else {
      // Create new wishlist if it doesn't exist
      const newWishlist = new Wishlist({
        userEmail,
        items: [
          {
            productId: items.productId,
            addedAt: new Date(),
          },
        ],
      });
      await newWishlist.save();
      wishlist = newWishlist; // Assign the new wishlist to the variable
    }

    // At this point, wishlist is guaranteed to be non-null
    return NextResponse.json(
      {
        status: 201,
        success: true,
        message: wishlist!.isNew
          ? "Wishlist created successfully"
          : "Product added to wishlist successfully",
        data: wishlist!,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error in wishlist controller:", error);
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

import connectDB from "@/config/db/connectDB";
import Cart, { ICartItem } from "@/models/cart.model/cart.model";
import { NextResponse } from "next/server";
interface CartRequestBody {
  userEmail: string;
  items: {
    productId: string;
    quantity: number;
  };
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const { userEmail, items }: CartRequestBody = await req.json();

    console.log(userEmail, items);

    if (!userEmail || !items || !items.productId || !items.quantity) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          message: "All fields (userEmail, productId, quantity) are required",
        },
        { status: 400 }
      );
    }

    // Check if cart already exists for this user
    let cart = await Cart.findOne({ userEmail });

    if (cart) {
      // Cart exists, check if product already in cart
      const existingItemIndex = cart.items.findIndex(
        (item: ICartItem) => item.productId.toString() === items.productId
      );

      if (existingItemIndex > -1) {
        // Product exists, update quantity
        cart.items[existingItemIndex].quantity += items.quantity;
      } else {
        // Add new product to existing cart
        cart.items.push({
          productId: items.productId,
          quantity: items.quantity,
        });
      }

      await cart.save();
    } else {
      // Create new cart if it doesn't exist
      cart = new Cart({
        userEmail,
        items: [
          {
            productId: items.productId,
            quantity: items.quantity,
          },
        ],
      });
      await cart.save();
    }

    return NextResponse.json(
      {
        status: 201,
        success: true,
        message: cart.isNew
          ? "Cart created successfully"
          : "Cart updated successfully",
        data: cart,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in cart controller:", error);
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

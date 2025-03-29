import connectDB from "@/config/db/connectDB";
import Cart from "@/models/cart.model/cart.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
interface CartRequestBody {
  userEmail: string;
  items: {
    productId: string;
    quantity: number;
  };
}
// Matching your exact schema
interface ICartItem {
  productId: string;
  quantity: number;
  _id?: string;
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const session = await getServerSession();
    const user = session?.user;

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

    const { items }: CartRequestBody = await req.json();

    if (!items || !items.productId || !items.quantity) {
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
    let cart = await Cart.findOne({ userEmail: user?.email });

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

export async function GET(req: Request) {
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

    const cart = await Cart.findOne({ userEmail: user.email })
      .populate({
        path: "items.productId",
        model: "Product", // Ensure this matches your Product model name
      })
      .exec();

    if (!cart) {
      return NextResponse.json(
        {
          status: 404,
          success: false,
          message: "Cart not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: 200,
        success: true,
        message: "Cart retrieved successfully",
        data: cart,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching cart:", error);
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
// app/api/cart/route.ts
export async function PUT(req: Request) {
  try {
    await connectDB();
    const session = await getServerSession();
    const user = session?.user;

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

    interface CartUpdateRequest {
      userEmail: string;
      productId: string;
      action: "add" | "remove";
    }

    const { productId, action }: CartUpdateRequest = await req.json();

    // Validate request body
    if (!productId || !action) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          message: "All fields (userEmail, productId, action) are required",
        },
        { status: 400 }
      );
    }

    // Find the cart
    let cart = await Cart.findOne({ userEmail: user.email });

    if (!cart) {
      // If cart doesn't exist and action is 'add', create new cart
      if (action === "add") {
        cart = new Cart({
          userEmail: user.email,
          items: [{ productId, quantity: 1 }],
        });
        await cart.save();

        return NextResponse.json(
          {
            status: 201,
            success: true,
            message: "Cart created with new item",
            data: cart,
          },
          { status: 201 }
        );
      }
      return NextResponse.json(
        {
          status: 404,
          success: false,
          message: "Cart not found",
        },
        { status: 404 }
      );
    }

    // Find item index using the exact productId from your data
    const itemIndex = cart.items.findIndex(
      (item: { productId: string; quantity: number; _id: string }) =>
        item.productId.toString() === productId
    );

    if (action === "add") {
      if (itemIndex > -1) {
        // Item exists, increment quantity by 1
        cart.items[itemIndex].quantity += 1;
      } else {
        // Item doesn't exist, add new item with quantity 1
        cart.items.push({
          productId,
          quantity: 1,
        });
      }
    } else if (action === "remove") {
      if (itemIndex === -1) {
        return NextResponse.json(
          {
            status: 404,
            success: false,
            message: "Item not found in cart",
          },
          { status: 404 }
        );
      }

      // Decrease quantity by 1
      cart.items[itemIndex].quantity -= 1;

      // Remove item if quantity reaches 0
      if (cart.items[itemIndex].quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      }
    }

    // Save updated cart
    await cart.save();

    return NextResponse.json(
      {
        status: 200,
        success: true,
        message: `Item ${
          action === "add" ? "added to" : "removed from"
        } cart successfully`,
        data: cart,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in cart update controller:", error);
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

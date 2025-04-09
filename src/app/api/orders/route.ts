import connectDB from "@/config/db/connectDB";
import Order from "@/models/order.model/order.model";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

// Interface for request body validation
interface OrderRequestBody {
  customer: {
    userId: string;
    name: string;
    email: string;
    phone?: string;
  };
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
    subtotal: number;
  }>;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  payment: {
    method: "sslcommerz" | "strip" | "cod";
    status: "pending" | "paid" | "failed";
    amount: number;
  };
  notes?: string;
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body: OrderRequestBody = await req.json();

    console.log(body);
    // Validation
    const requiredFields = [
      body.customer?.userId,
      body.customer?.name,
      body.customer?.email,
      body.items?.length > 0,
      body.shippingAddress?.street,
      body.shippingAddress?.city,
      body.shippingAddress?.state,
      body.shippingAddress?.postalCode,
      body.shippingAddress?.country,
      body.payment?.method,
      body.payment?.amount,
    ];

    // if (requiredFields.some((field) => !field)) {
    //   return NextResponse.json(
    //     {
    //       status: 400,
    //       success: false,
    //       message: "Missing required fields",
    //     },
    //     { status: 400 }
    //   );
    // }

    // Validate items
    for (const item of body.items) {
      if (
        !item.productId ||
        !item.name ||
        item.quantity < 1 ||
        item.price < 0 ||
        item.subtotal < 0
      ) {
        return NextResponse.json(
          {
            status: 400,
            success: false,
            message: "Invalid item data",
          },
          { status: 400 }
        );
      }
    }

    // Generate unique order number
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000);
    const orderNumber = `ORD-${timestamp}-${randomNum}`;

    // Create new order
    const order = new Order({
      orderNumber,
      customer: {
        userId: body.customer.userId,
        name: body.customer.name,
        email: body.customer.email,
        phone: body.customer.phone,
      },
      items: body.items.map((item) => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.subtotal,
      })),
      shippingAddress: {
        street: body.shippingAddress.street,
        city: body.shippingAddress.city,
        state: body.shippingAddress.state,
        postalCode: body.shippingAddress.postalCode,
        country: body.shippingAddress.country,
      },
      billingAddress: body.billingAddress
        ? {
            street: body.billingAddress.street,
            city: body.billingAddress.city,
            state: body.billingAddress.state,
            postalCode: body.billingAddress.postalCode,
            country: body.billingAddress.country,
          }
        : undefined,
      totalAmount: body.items.reduce((sum, item) => sum + item.subtotal, 0),
      status: "pending",
      payment: {
        method: body.payment.method,
        status: body.payment.status,
        amount: body.payment.amount,
      },
      notes: body.notes,
    });
    console.log(order);

    // Save order to database
    await order.save();

    return NextResponse.json(
      {
        status: 201,
        success: true,
        message: "Order created successfully",
        data: order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      {
        status: 500,
        success: false,
        message: "Failed to create order",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Optional: GET handler to retrieve an order
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("id");
    const orderNumber = searchParams.get("orderNumber");

    if (!orderId && !orderNumber) {
      return NextResponse.json(
        {
          status: 400,
          success: false,
          message: "Order ID or order number is required",
        },
        { status: 400 }
      );
    }

    const order = await Order.findOne({
      $or: [{ _id: orderId }, { orderNumber }],
    });

    if (!order) {
      return NextResponse.json(
        {
          status: 404,
          success: false,
          message: "Order not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: 200,
        success: true,
        message: "Order retrieved successfully",
        data: order,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving order:", error);
    return NextResponse.json(
      {
        status: 500,
        success: false,
        message: "Failed to retrieve order",
      },
      { status: 500 }
    );
  }
}

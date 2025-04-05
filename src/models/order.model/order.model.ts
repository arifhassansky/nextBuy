// types/order.ts
export interface Orders {
  _id?: string;
  orderNumber: string;
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
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  payment: {
    method: "sslcommerz" | "strip" | "cod";
    status: "pending" | "paid" | "failed";
    transactionId?: string;
    amount: number;
  };
  createdAt: Date;
  updatedAt?: Date;
  trackingNumber?: string;
  notes?: string;
}

// For Mongoose schema (if using MongoDB)
// models/Order.ts
import { Schema, model, models } from "mongoose";
import { v4 as uuid } from "uuid";

const orderSchema = new Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    customer: {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
        subtotal: { type: Number, required: true, min: 0 },
      },
    ],
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    billingAddress: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    payment: {
      method: {
        type: String,
        enum: ["sslcommerz", "stripe", , "cod"],
        required: true,
      },
      status: {
        type: String,
      },
      transactionId: String,
      amount: { type: Number, required: true },
    },
    trackingNumber: {
      type: String,
      default: uuid(),
    },
    notes: String,
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

const Order = models.Order || model<Orders>("Order", orderSchema);

export default Order;

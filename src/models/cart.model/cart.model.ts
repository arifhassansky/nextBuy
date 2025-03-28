import { Schema, model, Document, Types, models } from "mongoose";

// Define the cart item interface
export interface ICartItem {
  productId: Types.ObjectId | string;
  quantity: number;
}

// Define the cart interface
export interface ICart extends Document {
  userEmail: string;
  items: ICartItem[];
  isNew: boolean; // Added for the response message logic
}

const cartSchema = new Schema<ICart>({
  userEmail: { type: String, required: true, unique: true },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
});

const Cart = models.Cart || model<ICart>("Cart", cartSchema);

export default Cart;

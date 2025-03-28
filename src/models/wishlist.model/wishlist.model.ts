import moment from "moment";
import { Schema, model, Document, Types, models } from "mongoose";

// Define wishlist item interface
export interface IWishlistItem {
  productId: Types.ObjectId | string;
  addedAt: Date;
}

// Define wishlist interface
export interface IWishlist extends Document {
  userEmail: string;
  items: IWishlistItem[];
  isNew: boolean;
}

const wishlistSchema = new Schema<IWishlist>(
  {
    userEmail: {
      type: String,
      required: true,
      unique: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        addedAt: {
          type: String,
          default: moment().format("MMM Do YYYY"),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Wishlist =
  models.Wishlist || model<IWishlist>("Wishlist", wishlistSchema);

export default Wishlist;

import { Schema, model, models } from "mongoose";
import slugify from "slugify";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    images: [{ type: String }],

    category: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    status: {
      type: String,
      default: "active",
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    storeId: {
      type: Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title).toLocaleLowerCase();
  }
  next();
});

const Product = models.Product || model("Product", productSchema);

export default Product;

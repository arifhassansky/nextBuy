import { Schema, models, model } from "mongoose";
import slugify from "slugify";

const storeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
  destruction: {
    type: String,
  },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  coverImage: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

storeSchema.pre("save", async function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name).toLocaleLowerCase();
  }
  next();
});

const Store = models.Store || model("Store", storeSchema);

export default Store;

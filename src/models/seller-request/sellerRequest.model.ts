import { Schema, models, model } from "mongoose";

const sellerRequestSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  status: {
    type: String,
    default: "pending",
  },
});

const SellerRequest =
  models.SellerRequest || model("SellerRequest", sellerRequestSchema);

export default SellerRequest;

import { Schema, models, model } from "mongoose";

const paymentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  storeId: {
    type: Schema.Types.ObjectId,
    ref: "Store",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },

  stripeId: {
    type: String,
  },

  status: {
    type: String,
    required: true,
  },
});

const Payment = models.Payment || model("Payment", paymentSchema);

export default Payment;

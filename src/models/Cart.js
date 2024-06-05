import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
        default: [],
      },
    ],
    amount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default model("Cart", cartSchema);

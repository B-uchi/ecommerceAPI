import mongoose, { Schema } from "mongoose";

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
        _id: false,
      },
    ],
    amount: { type: Number, default: 0 },
  }
);

export default mongoose.model("Cart", cartSchema);

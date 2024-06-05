import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
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
    featured: {
      type: Boolean,
      default: false,
    },
    categories: {
      type: Array,
      required: true,
    },
    colors: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Product", productSchema);
import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isAdmin: { type: Boolean, default: false },
    username: {
      unique: true,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("User", userSchema);

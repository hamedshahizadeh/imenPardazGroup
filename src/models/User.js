import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  role: {
    type: String,
    default: "USER",
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updateAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const User = models.User || model("User", userSchema);
export default User;

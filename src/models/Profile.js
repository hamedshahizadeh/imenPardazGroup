import { Schema, model, models } from "mongoose";

const profileSchema = new Schema(
  {
    published : {
      type : Boolean,
      default : false
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    meterage: { type: String },
    room: { type: String },
    price: { type: String },
    realState: { type: String },
    province: { type: String },
    city: { type: String },
    cellOrRent: { type: String },
   
    category: {
      type: String,
      enum: ["villa", "apartment", "store", "office", "land"],
      required: true,
    },
    constructionDate: {
      type: Date,
    },
    rules: {
      type: [String],
      default: [],
    },
    mortgage : {type : String},
    rental : {type : String},
    amentites: {
      type: [String],
      default: [],
    },
    img: {
      type: [String],
      default: [],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Profile = models.Profile || model("Profile", profileSchema);

export default Profile;

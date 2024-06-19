import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  { 
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxLength: 25,
    },
    fullname: {
      type: String,
      trim: true,
      maxLength: 25,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    socialLinks: [
      {
        platform: { type: String },
        link: { type: String },
      },
    ],
    testimonials: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Testimonial",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

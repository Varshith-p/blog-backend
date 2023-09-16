const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      required: [true, "First name is required"],
      type: String,
      trim: true,
    },
    lastName: {
      required: [true, "Last name is required"],
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      default:
        "https://img.freepik.com/premium-psd/3d-cartoon-character-avatar-isolated-3d-rendering_235528-548.jpg?w=740",
    },
    email: {
      type: String,
      required: [true, "Provide email..."],
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Provide a valid email...",
      },
    },
    password: {
      type: String,
      required: [true, "Provide password..."],
      minlength: 5,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.virtual("posts", {
  ref: "Post",
  foreignField: "user",
  localField: "_id",
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);

import { authorizationRoles } from "@/constants";
import { IUser } from "@/types/user.interface";
import { model, models, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { environmentConfig } from "@/configs";

export interface IUserDocument extends Document, IUser {
  comparePassword(password: string): Promise<boolean>;

  createJWT(): Promise<void>;
}

const UserSchema: Schema<IUserDocument> = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Please provide first name"],
      minLength: [3, "First name can't be smaller than 3 characters"],
      maxLength: [30, "First name can't be greated than 30 characters"],
    },

    lastName: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Please provide first name"],
      minLength: [3, "Last name can't be smaller than 3 characters"],
      maxLength: [30, "Last name can't be greated than 30 characters"],
    },

    email: {
      type: String,
      required: [true, "Please provide email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
      trim: true,
      lowercase: true,
      maxLength: [128, "Email can't be greater than 128 characters"],
    },

    password: {
      type: String,
      required: [true, "Please provide password"],
      minLength: [3, "Password must be more than 6 characters"],
      trim: true,
      select: false,
    },

    confirmPassword: {
      type: String,
      required: [true, "Please provide confirmed password"],
      minLength: [3, "Password must be more than 6 characters"],
      trim: true,
      select: false,
    },

    role: {
      type: String,
      trim: true,
      lowercase: true,
      enum: [authorizationRoles.user, authorizationRoles.admin],
      default: authorizationRoles.user,
    },

    profileImg: {
      type: String,
      required: true,
    },

    cloudinary_id: {
      type: String,
    },

    status: {
      type: String,
      enum: ["pending", "active"],
      default: "active",
      required: false,
      trim: true,
      lowercase: true,
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },

    isVerified: {
      type: Boolean,
      required: false,
    },

    resetPasswordExpires: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

UserSchema.pre("save", async function (next) {
  if (process?.env?.NODE_ENV && process.env.NODE_ENV === "development") {
    console.log("Middleware called before saving the user is", this);
  }

  const user = this;

  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(user.password, salt);
    user.confirmPassword = await bcrypt.hash(user.password, salt);
  }

  next();
});

UserSchema.post("save", function () {
  if (process?.env?.NODE_ENV && process.env.NODE_ENV === "development") {
    console.log(
      "Middleware called after saving the user is (User is been Save )",
      this
    );
  }
});

UserSchema.methods.createJWT = function () {
  const payload = {
    userId: this._id,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    role: this.role,
  };

  console.log(`[CreateJWT]: ${payload}`);
  return jwt.sign(payload, environmentConfig.JWT_KEY as string, {
    expiresIn: environmentConfig.JWT_EXPIRES_IN,
  });
};

export default models.User || model<IUserDocument>("User", UserSchema);

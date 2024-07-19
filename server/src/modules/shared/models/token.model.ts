import { TokenInterface } from "@/types/token.interface";
import { Document, model, models, Schema } from "mongoose";
import jwt from "jsonwebtoken";

export interface TokenInterfaceDocument extends Document, TokenInterface {
  generatePasswordReset(): Promise<void>;
  generateEmailVerificationToken(): Promise<void>;
  generateToken(): Promise<string>;
}

export const TokenSchema: Schema<TokenInterfaceDocument> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },

    emailVerificationToken: {
      type: String,
      required: false,
    },

    emailVerificationExpiresToken: {
      type: Date,
      required: false,
    },

    accessToken: {
      type: String,
      required: false,
    },

    refreshToken: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

// Generate password reset
TokenSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomUUID().toString();
  this.resetPasswordExpires = Date.now() + 3600000;
};

// Generate email verfication token
TokenSchema.methods.generateEmailVerificationToken = function () {
  this.emailVerificationToken = crypto.randomUUID().toString();
  this.emailVerificationExpiresToken = Date.now() + 3600000;
};

// Generate Refresh/Access token
TokenSchema.methods.generateToken = function (
  payload: { userId: Schema.Types.ObjectId },
  secret: string,
  signOptions: any
): Promise<string> {
  return new Promise(function (resolve, reject) {
    jwt.sign(
      payload,
      secret,
      signOptions,
      (err: Error | null, encoded: string | undefined) => {
        if (err === null && encoded !== undefined) {
          resolve(encoded);
        } else {
          reject(err);
        }
      }
    );
  });
};

TokenSchema.post("save", function () {
  if (process?.env?.NODE_ENV && process.env.NODE_ENV === "development") {
    console.log("[Token has been save]", this);
  }
});

export default models.Token || model("Token", TokenSchema);

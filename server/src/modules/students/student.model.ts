import { Document, model, Schema } from "mongoose";

interface ProfilePic {
  name: string;
  key?: string;
  url?: string;
}

interface IStudent extends Document {
  firstName: string;
  lastName: string;
  email: string;
  profilePic?: ProfilePic;
  mobile?: string;
  password?: string;
  interests?: Array<string>;
  dateJoined: Date;
  isBlocked: boolean;
  blockedReason: string;
}

const ProfileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  key: {
    type: String,
  },
  url: {
    type: String,
  },
});

const StudentSchema = new Schema<IStudent>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
  },

  profilePic: {
    type: ProfileSchema,
    required: false,
  },
  mobile: {
    type: String,

    trim: true,
    // unique:true,
    sparse: true, // Allow multiple null values
    match: [/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"],
  },
  interests: {
    type: [String],
    required: true,
    default: [],
  },
  password: {
    type: String,

    minlength: 8,
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },

  isBlocked: {
    type: Boolean,
    default: false,
  },
  blockedReason: {
    type: String,
    default: "",
  },
});

const StudentModel = model<IStudent>("StudentModel", StudentSchema, "students");

export default StudentModel;

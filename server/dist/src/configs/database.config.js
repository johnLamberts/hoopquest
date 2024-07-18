"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set("strictQuery", true);
const connectDB = (MONGODB_URI, DBNAME) => {
    mongoose_1.default.connection.on("connected", () => {
        if (process?.env?.NODE_ENV && process.env.NODE_ENV === "development") {
            console.log("MongoDB database connection established successfully".bold().blue);
        }
    });
    mongoose_1.default.connection.on("reconnect", () => {
        if (process?.env?.NODE_ENV && process.env.NODE_ENV === "development") {
            console.log("MongoDB database connection re-established successfully".bold().info);
        }
    });
    mongoose_1.default.connection.on("error", (error) => {
        if (process?.env?.NODE_ENV && process.env.NODE_ENV === "development") {
            console.log("MongoDB connection error. Please make sure MongoDB is running".italic
                .red);
            console.log(`MongoDB ERROR: ${error}`.italic.red);
        }
    });
    mongoose_1.default.connection.on("close", () => {
        if (process?.env?.NODE_ENV && process.env.NODE_ENV === "development") {
            console.log(`MongoDB connection closed.`.cyan);
        }
    });
    mongoose_1.default.connection.on("disconnected", () => {
        if (process?.env?.NODE_ENV && process.env.NODE_ENV === "development") {
            console.log("MongoDB database connection is disconnected...");
            console.log("Trying to reconnect to Mongo ...");
        }
        setTimeout(() => {
            mongoose_1.default.connect(MONGODB_URI, {
                keepAlive: true,
                socketTimeoutMS: 3000,
                connectTimeoutMS: 3000,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        }, 3000);
    });
    process.on("SIGINT", () => {
        mongoose_1.default.connection.close();
        if (process?.env?.NODE_ENV && process.env.NODE_ENV === "development") {
            console.log("MongoDB database connection is disconnected due to app termination...");
        }
        process.exit(0);
    });
    mongoose_1.default.connect(MONGODB_URI, {
        dbName: DBNAME,
    });
    return mongoose_1.default.connect(MONGODB_URI, {
        dbName: DBNAME,
    });
};
exports.connectDB = connectDB;
exports.default = exports.connectDB;
//# sourceMappingURL=database.config.js.map
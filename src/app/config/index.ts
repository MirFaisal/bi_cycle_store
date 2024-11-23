import dotenv from "dotenv";

dotenv.config({ path: process.cwd() + "/.env" });

export default {
  port: process.env.PORT || 8000,
  dbUri: process.env.MONGODB_URI,
};

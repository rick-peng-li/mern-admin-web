import dotenv from "dotenv";

dotenv.config();

const requiredKeys = ["MONGO_URI", "JWT_SECRET"];

for (const key of requiredKeys) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  defaultAdminEmail: process.env.DEFAULT_ADMIN_EMAIL || "admin@demo.com",
  defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD || "Admin123456!",
  defaultAdminFirstName: process.env.DEFAULT_ADMIN_FIRST_NAME || "System",
  defaultAdminLastName: process.env.DEFAULT_ADMIN_LAST_NAME || "Admin",
};

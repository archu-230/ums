require("dotenv").config();

const ENV = {
    NODE_ENV: process.env.NODE_ENV || "development",
    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,

    JWT_RESET_PASSWORD_SECRET: process.env.JWT_RESET_PASSWORD_SECRET,

    EMAIL_SERVICE: process.env.EMAIL_SERVICE || "gmail",
    EMAIL_HOST: process.env.EMAIL_HOST || "",
    EMAIL_PORT: Number(process.env.EMAIL_PORT) || 587,
    EMAIL_SECURE: process.env.EMAIL_SECURE === "true",

    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME || "User Management System",

    EMAIL_TLS_REJECT_UNAUTHORIZED:
        process.env.EMAIL_TLS_REJECT_UNAUTHORIZED !== "false",

    OTP_LENGTH: Number(process.env.OTP_LENGTH) || 6,
    OTP_EXPIRY_MINUTES: Number(process.env.OTP_EXPIRY_MINUTES) || 5,

    RESET_PASSWORD_EXPIRY_MINUTES:
        Number(process.env.RESET_PASSWORD_EXPIRY_MINUTES) || 15,
    RESET_PASSWORD_URL:
        process.env.RESET_PASSWORD_URL ||
        `${process.env.CLIENT_URL || "http://localhost:5173"}/reset-password`,
};

module.exports = ENV;
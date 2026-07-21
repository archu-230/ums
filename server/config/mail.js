const nodemailer = require("nodemailer");
const { EMAIL_MESSAGES } = require("../constants/messages/email");
const ENV = require("../constants/env");

let transportOptions;

if (ENV.EMAIL_HOST) {
    transportOptions = {
        host: ENV.EMAIL_HOST,
        port: ENV.EMAIL_PORT,
        secure: ENV.EMAIL_SECURE,
    };
} else {
    transportOptions = {
        service: ENV.EMAIL_SERVICE || "gmail",
    };
}

transportOptions.auth = {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASS,
};

transportOptions.tls = {
    rejectUnauthorized: ENV.EMAIL_TLS_REJECT_UNAUTHORIZED,
};

const transporter = nodemailer.createTransport(transportOptions);

if (typeof transporter.sendMail !== "function") {
    throw new Error(
        "nodemailer.createTransport() did not return a valid transporter. " +
        "Check your EMAIL_* env vars and that nodemailer is installed correctly."
    );
}

transporter.verify((error) => {
    if (error) {
        console.error(EMAIL_MESSAGES.CONNECTION_FAILED, error.message);
        return;
    }
    console.log(EMAIL_MESSAGES.CONNECTION_SUCCESS);
});

module.exports = transporter;
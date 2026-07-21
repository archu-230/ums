const ENV = require("../constants/env");

const otpEmailTemplate = ({ name, otp }) => `
<div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
  <h2 style="color: #111827;">Password Reset OTP</h2>
  <p style="color: #374151;">Hi ${name || "there"},</p>
  <p style="color: #374151;">
    Use the OTP below to reset your password. This code is valid for
    <strong>${ENV.OTP_EXPIRY_MINUTES} minutes</strong>.
  </p>
  <div style="text-align: center; margin: 24px 0;">
    <span style="display: inline-block; font-size: 28px; letter-spacing: 6px; font-weight: bold; color: #111827; background: #f3f4f6; padding: 12px 24px; border-radius: 6px;">
      ${otp}
    </span>
  </div>
  <p style="color: #6b7280; font-size: 13px;">
    If you did not request a password reset, you can safely ignore this email.
  </p>
</div>
`;

module.exports = otpEmailTemplate;
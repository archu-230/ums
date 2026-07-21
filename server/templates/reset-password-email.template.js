const ENV = require("../constants/env");

const resetPasswordEmailTemplate = ({ name, resetLink }) => `
<div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
  <h2 style="color: #111827;">Reset Your Password</h2>
  <p style="color: #374151;">Hi ${name || "there"},</p>
  <p style="color: #374151;">
    Click the button below to reset your password. This link is valid for
    <strong>${ENV.RESET_PASSWORD_EXPIRY_MINUTES} minutes</strong>.
  </p>
  <div style="text-align: center; margin: 24px 0;">
    <a href="${resetLink}"
       style="display: inline-block; background: #111827; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold;">
      Reset Password
    </a>
  </div>
  <p style="color: #6b7280; font-size: 13px;">
    If the button above doesn't work, copy and paste this link into your browser:
    <br />
    <span style="word-break: break-all;">${resetLink}</span>
  </p>
  <p style="color: #6b7280; font-size: 13px;">
    If you did not request a password reset, you can safely ignore this email.
  </p>
</div>
`;

module.exports = resetPasswordEmailTemplate;
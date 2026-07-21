const EMAIL_MESSAGES = {
    CONNECTION_SUCCESS: "Email transporter connected successfully.",
    CONNECTION_FAILED: "Failed to connect email transporter.",

    PASSWORD_RESET_SUBJECT: "Reset Your Password",
    OTP_SUBJECT: "Password Reset OTP",

    PASSWORD_RESET_SENT: "Password reset link has been sent to your registered email.",
    PASSWORD_RESET_SUCCESS: "Password has been reset successfully.",
    PASSWORD_RESET_FAILED: "Unable to reset password.",
    PASSWORD_RESET_LINK_EXPIRED: "Password reset link has expired.",
    PASSWORD_RESET_LINK_INVALID: "Invalid password reset link.",

    OTP_SENT: "OTP has been sent to your registered email.",
    OTP_VERIFIED: "OTP verified successfully.",
    OTP_INVALID: "Invalid OTP.",
    OTP_EXPIRED: "OTP has expired.",
    OTP_RESENT: "OTP has been resent successfully.",

    RESET_LINK_SENT: "Password reset link has been sent to your registered email.",
    RESET_TOKEN_MISSING: "Reset token is required.",

    USER_NOT_FOUND: "User not found with the provided email.",

    INTERNAL_SERVER_ERROR: "Internal server error.",
};

module.exports = {
    EMAIL_MESSAGES,
};
import { z } from "zod";
import FORGOT_PASSWORD_MESSAGES from "../../constants/messages/forgot-password-messages";

export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .trim()
        .email(FORGOT_PASSWORD_MESSAGES.EMAIL_INVALID),
});

export const resetWithOtpSchema = z
    .object({
        otp: z
            .string()
            .trim()
            .length(6, FORGOT_PASSWORD_MESSAGES.OTP_INVALID),

        newPassword: z
            .string()
            .min(6, FORGOT_PASSWORD_MESSAGES.PASSWORD_MIN),

        confirmPassword: z
            .string()
            .min(6, FORGOT_PASSWORD_MESSAGES.PASSWORD_MIN),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: FORGOT_PASSWORD_MESSAGES.PASSWORDS_DO_NOT_MATCH,
        path: ["confirmPassword"],
    });

export const resetWithLinkSchema = z
    .object({
        newPassword: z
            .string()
            .min(6, FORGOT_PASSWORD_MESSAGES.PASSWORD_MIN),

        confirmPassword: z
            .string()
            .min(6, FORGOT_PASSWORD_MESSAGES.PASSWORD_MIN),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: FORGOT_PASSWORD_MESSAGES.PASSWORDS_DO_NOT_MATCH,
        path: ["confirmPassword"],
    });
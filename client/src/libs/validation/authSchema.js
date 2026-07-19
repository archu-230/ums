import { z } from "zod";
import LOGIN_MESSAGES from "../../constants/messages/login-messages";
import SIGNUP_MESSAGES from "../../constants/messages/signup-messages";
export const signupSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, SIGNUP_MESSAGES.NAME_MIN)
        .max(20, SIGNUP_MESSAGES.NAME_MAX),

    email: z
        .string()
        .trim()
        .email(SIGNUP_MESSAGES.EMAIL_INVALID),

    password: z
        .string()
        .min(6, SIGNUP_MESSAGES.PASSWORD_MIN)
        .max(15, SIGNUP_MESSAGES.PASSWORD_MAX),
});

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email(LOGIN_MESSAGES.EMAIL_INVALID),

    password: z
        .string()
        .min(6, LOGIN_MESSAGES.PASSWORD_MIN),
});
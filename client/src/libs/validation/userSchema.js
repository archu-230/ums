import { z } from "zod";
import CREATE_USER_MESSAGES from "../../constants/messages/create-user-messages";
import UPDATE_USER_MESSAGES from "../../constants/messages/update-user-messages";
export const createUserSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, CREATE_USER_MESSAGES.NAME_MIN)
        .max(20, CREATE_USER_MESSAGES.NAME_MAX),

    email: z
        .string()
        .trim()
        .email(CREATE_USER_MESSAGES.EMAIL_INVALID),

    password: z
        .string()
        .min(6, CREATE_USER_MESSAGES.PASSWORD_MIN)
        .max(15, CREATE_USER_MESSAGES.PASSWORD_MAX),
});

export const updateUserSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, UPDATE_USER_MESSAGES.NAME_MIN)
        .max(20, UPDATE_USER_MESSAGES.NAME_MAX),

    email: z
        .string()
        .trim()
        .email(UPDATE_USER_MESSAGES.EMAIL_INVALID),

    password: z
        .string()
        .refine(
            (value) => value === "" || value.length >= 6,
            UPDATE_USER_MESSAGES.PASSWORD_MIN
        )
        .refine(
            (value) => value === "" || value.length <= 15,
            UPDATE_USER_MESSAGES.PASSWORD_MAX
        ),
});
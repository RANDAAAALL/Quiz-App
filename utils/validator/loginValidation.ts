import { z } from "zod";

const LoginValidateForm = (email: string, password: string) => {
    const schema = z.object({
        email: z.string().email("Invalid email address").regex(/@/, "Email must contain '@'"),
        password: z.string()
            .min(7, "Password must have at least 7 characters")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        })

    return schema.safeParse({ email, password});
};

export {LoginValidateForm};
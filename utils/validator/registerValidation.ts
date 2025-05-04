import { z } from "zod";

const RegisterValidateForm = (email: string, password: string, confirmPassword: string) => {
    const schema = z.object({
        email: z.string().email("Invalid email address"),
        password: z.string()
            .min(7, "Password must have at least 7 characters")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter"),
        confirmPassword: z.string().min(7, "Password must have at least 7 characters")
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

    return schema.safeParse({ email, password, confirmPassword});
};


export { RegisterValidateForm};

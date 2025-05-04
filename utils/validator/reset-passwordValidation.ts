import { z } from "zod"

const ResetPasswordValidateForm = (email: string) => {
    const schema = z.object({
        email: z.string().email("Invalid email address"),
    });

    return schema.safeParse(email);
}

export { ResetPasswordValidateForm }
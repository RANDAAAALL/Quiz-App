import { inputType } from "./types/typesNature";

 const bgColorsNature: { LinearGradient: [string, string, ...string[]] } = {
    LinearGradient: ['#4c669f', '#3b5998', '#192f6a']
};

const inputNature = (
    values: Record<string, string>,
    onChange: (name: string, value: string) => void
    ): inputType => [
    {
        id: 1,
        name: "email",
        label: "Email",
        placeholder: "Enter your email",
        value: values.email,
        onChange: (e) => onChange("email", e),
    },
    {
        id: 2,
        name: "password",
        label: "Password",
        placeholder: "Enter your password",
        value: values.password,
        onChange: (e) => onChange("password", e),
        secureTextEntry: true,
    },
    {
        id: 3,
        name: "confirmPassword",
        label: "Confirm Password",
        placeholder: "Confirm your password",
        value: values.confirmPassword,
        onChange: (e) => onChange("confirmPassword", e),
        secureTextEntry: true
    },
]

export { bgColorsNature, inputNature };

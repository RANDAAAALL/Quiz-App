
type pathType = {
   route: string | any,
   routeTitle?: string ,
}[];

type inputType = {
    id?: number,
    name?: string,
    label?: string,
    placeholder?: string,
    value?: string ,
    onChange?: (value: string) => void,
    isPassword?: boolean,
    secureTextEntry?: boolean,
    autoCapitalize?: string,
}[];



export {pathType, inputType };
import { Dimensions } from "react-native";

export default function useScreenDimentions(): number{

    return Dimensions.get("window").width - 50;
}
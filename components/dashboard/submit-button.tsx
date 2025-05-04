import { mainScreenStyles } from "@/stylesheets/main-screenStyles";
import { AntDesign } from "@expo/vector-icons";
import { ActivityIndicator, TouchableOpacity, Text } from "react-native";

export default function SubmitButton({isLoading,
                                      handleSelectionsSubmit
                                     } : {
                                     isLoading: Boolean,
                                     handleSelectionsSubmit: () => void
                                     }){
    return (
        <TouchableOpacity
        style={mainScreenStyles.button}
        disabled={isLoading ? true : false}
        onPress={handleSelectionsSubmit}>
        {isLoading ? (
        <ActivityIndicator size="small" color={mainScreenStyles.activityIndicator.color}/>
        ) : (
        <>
        <Text style={mainScreenStyles.buttonTextTitle}>Attempt</Text>
        <AntDesign style={mainScreenStyles.antDesignIcon} name="arrowright" size={20} color={mainScreenStyles.antDesignIcon.color} />
        </>
        )}
        </TouchableOpacity>
    );
}
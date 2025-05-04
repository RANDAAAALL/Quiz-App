import { resetPasswordStyles } from "@/stylesheets/reset-passwordStyles";
import useFormSubmit from "@/utils/custom-hooks/useForms";
import { inputNature } from "@/utils/natures";
import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";

export default function ResetPasswordForm(){
  const [formValues, setFormValues] = useState({email: ""})
  const {isLoading, handleErrors, handleFormSubmit} = useFormSubmit(formValues, "reset-password");

  // reset field values if success
    useEffect(() => {
      if (handleErrors?.success) {
        setFormValues({ email: "" });

        alert("reset password link successfully sent!");

        // we navigate to the "login" screen afterwards
        // router.push("/screens/login");
      }
    }, [handleErrors]);

  const handleFormChange = (key: string, value: string) => {
    setFormValues({ ...formValues, [key]: value });
  }

    return (
       <View style={resetPasswordStyles.contentContainer}>
        <Text style={resetPasswordStyles.textTitle}>Forgot your password?</Text>
        <Text style={resetPasswordStyles.subTextTitle}>We'll send you a link to reset your password. Just check your email and follow the instructions to set a new one.</Text>
        <View style={resetPasswordStyles.formContainer}>
        {inputNature(formValues, handleFormChange).map((input, i) => (
          <View key={i}>
         {i === 0 && (
           <>
         <TextInput 
            editable={handleErrors?.success ? false : true}
            style={resetPasswordStyles.input}
            placeholder={input?.placeholder}
            autoCapitalize="none"
            value={input.value}
            onChangeText={input.onChange}/>
          </>
          )}
        {handleErrors && handleErrors[input.name ?? ""] && <Text style={resetPasswordStyles.errorTextTitle}>{handleErrors[input.name ?? ""]}</Text>}
         </View>
        ))}
        <TouchableOpacity
       disabled={isLoading ? true : false}
       onPress={handleFormSubmit} 
       style={resetPasswordStyles.button}>
       <Text style={resetPasswordStyles.buttonTextTitle}>{isLoading ? <ActivityIndicator size="small" color="black"/> : "Reset Password" }</Text>
       </TouchableOpacity>
         </View>
      </View>
    );
}
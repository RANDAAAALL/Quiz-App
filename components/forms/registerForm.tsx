import { inputNature } from "@/utils/natures";
import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import {Ionicons} from '@expo/vector-icons';
import { router } from "expo-router";
import { RegisterStyles } from "@/stylesheets/registerStyles";
import useFormSubmit from "@/utils/custom-hooks/useForms";

export default function RegisterForm() {
  const [formValues, setFormValues] = useState({email: "",password: "",confirmPassword: ""})
  const [isShowIcon, setIsShowIcon] = useState<Record<number, boolean>>({});
  const {isLoading, handleErrors, handleFormSubmit} = useFormSubmit(formValues, "register");

  // reset field values if success
  useEffect(() => {
    if (handleErrors?.success) {
      setFormValues({ email: "", password: "", confirmPassword: "" });
    }
  }, [handleErrors]);

  const handleFormChange = (key: string, value: string) => {
      setFormValues({ ...formValues, [key]: value });
  }

  return (
    <>
    <View style={RegisterStyles.contentContainer}>
    <Text style={RegisterStyles.title}>Create Account</Text>
    <Text style={RegisterStyles.subtitle}>Test your programming knowledge</Text>
    <View style={RegisterStyles.formContainer}>
    {inputNature(formValues,handleFormChange).map((input, _ ) => (
      <View key={input.id ?? 0}>
      <View style={RegisterStyles.inputContainer}> 
      <Text style={RegisterStyles.label}>{input.label}</Text>
        {input?.secureTextEntry ? (
          <View style={RegisterStyles.passwordContainer}>
            <TextInput 
            editable={handleErrors?.success ? false : true}
            style={RegisterStyles.passwordInput}
            placeholder={input.placeholder}
            autoCapitalize="none"
            value={input.value}
            onChangeText={input.onChange}
            secureTextEntry={!isShowIcon[input.id ?? 0]}
            />
            <TouchableOpacity style={RegisterStyles.eyeIconContainer} 
              onPress={() => setIsShowIcon(prev => ({...prev, [input.id ?? 0]: !prev[input.id ?? 0]}))}>
              <Ionicons 
                name={isShowIcon[input.id ?? 0] ? "eye-off" : "eye"}
                size={24}
              />
            </TouchableOpacity>
          </View>
          ) : (
            <>
            <TextInput 
            editable={handleErrors?.success ? false : true}
            style={RegisterStyles.inputs}
            placeholder={input.placeholder}
            autoCapitalize="none"
            value={input.value}
            onChangeText={input.onChange}
            secureTextEntry={!isShowIcon}
            />
            </>
          )}
            {handleErrors && handleErrors[input.name ?? ""] && <Text style={RegisterStyles.errorTextTitle}>{handleErrors[input.name ?? ""]}</Text>}
         </View>
        </View>
      ))}
       <TouchableOpacity
       disabled={isLoading ? true : false}
       onPress={handleFormSubmit} 
       style={RegisterStyles.registerButton}>
       <Text style={RegisterStyles.registerButtonText}>{isLoading ? <ActivityIndicator size="small" color="black"/> : "Register" }</Text>
       </TouchableOpacity>
      <View style={RegisterStyles.LoginTextContainer}>
        <Text style={RegisterStyles.LoginTextTitle}>Already have an account?</Text>
          <TouchableOpacity disabled={isLoading ? true : false} onPress={() => router.push("/screens/login")}>
            <Text style={RegisterStyles.LoginRouteText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </>
 );
}
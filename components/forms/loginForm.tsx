import { LoginStyles } from "@/stylesheets/loginStyles";
import useFormSubmit from "@/utils/custom-hooks/useForms";
import { inputNature } from "@/utils/natures";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";

export default function LoginForm(){
    const [formValues, setFormValues] = useState({email: "", password: ""});
    const [isShowIcon, setIsShowIcon] = useState<Record<number, boolean>>({});
    const {isLoading, handleErrors, handleFormSubmit} = useFormSubmit(formValues, "login");
    
    // reset field values if success
    useEffect(() => {
    if (handleErrors?.success) {
      setFormValues({ email: "", password: ""});
    }
  }, [handleErrors]);

    const handleFormChange = (keyName: string, value: string) => {
        setFormValues({ ...formValues, [keyName]: value });
    }
    return (
        <>
        <View style={LoginStyles.contentContainer}>
        <Text style={LoginStyles.title}>Welcome</Text>
        <Text style={LoginStyles.subtitle}>Login to continue</Text>
        <View style={LoginStyles.formContainer}>
        {inputNature(formValues,handleFormChange).filter(input => input.id !== 3).map((input, _) => (
        <View key={input.id ?? 0}>
        <View style={LoginStyles.inputContainer}> 
        <Text style={LoginStyles.label}>{input.label}</Text>
        {input?.secureTextEntry ? (
          <View style={LoginStyles.passwordContainer}>
            <TextInput 
            style={LoginStyles.passwordInput}
            placeholder={input.placeholder}
            autoCapitalize="none"
            value={input.value}
            onChangeText={input.onChange}
            secureTextEntry={!isShowIcon[input.id ?? 0]}
            />
            <TouchableOpacity style={LoginStyles.eyeIconContainer} 
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
            style={LoginStyles.inputs}
            placeholder={input.placeholder}
            autoCapitalize="none"
            value={input.value}
            onChangeText={input.onChange}
            secureTextEntry={!isShowIcon}
            />
            </>
          )}
          {handleErrors && handleErrors[input.name ?? ""] && <Text style={{ color: "red", marginTop: 4, marginLeft: 5 }}>{handleErrors[input.name ?? ""]}</Text>}
       </View>
       
      </View>
      
    ))}
        <View style={LoginStyles.forgotPasswordContainer}>
        <Text onPress={() => router.push("/screens/reset-password")}>Forgot Password?</Text>
        </View>
        <TouchableOpacity
        onPress={handleFormSubmit} 
        style={LoginStyles.loginButton}
        disabled={isLoading ? true : false}>
        <Text style={LoginStyles.loginButtonText}>{isLoading ? <ActivityIndicator size="small" color="black"/> : "Login" }</Text>
        </TouchableOpacity>
        <View style={LoginStyles.RegisterTextContainer}>
        <Text style={LoginStyles.RegisterTextTitle}>Doesn't have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/screens/register")}>
        <Text style={LoginStyles.RegisterRouteText}>Register</Text>
        </TouchableOpacity>
       </View>
      </View>
    </View>
  </>
    );
}
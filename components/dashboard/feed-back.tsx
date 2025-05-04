import { auth, db } from "@/config/firebase";
import { feedbackStyles } from "@/stylesheets/feed-backStyles";
import useInitializeApp from "@/utils/custom-hooks/useInitializeApp";
import useLoading from "@/utils/custom-hooks/useLoading";
import { AntDesign } from "@expo/vector-icons";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import {useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";

export default function Feedback(){
  const [textArea, setTextArea] = useState<string | null>("");
  const { isInitialize, stopInitialize } = useInitializeApp(true);
  const { isLoading, startLoading, stopLoading } = useLoading();

  // for loading state...
  useEffect(() => {
     const delay = setTimeout(stopInitialize, 2000);
     return () => clearTimeout(delay);
  }, []);

  // logics for feedback submition
  const handleSubmitFeedback = async () => {
    startLoading();
    await new Promise(res => setTimeout(res, 2000));
    stopLoading();

    if(textArea?.trim() === "" || !auth.currentUser){
        alert("Oops!, Please enter your suggestion or feedback before submitting.");
        return;
    }

    const currentUserId = auth.currentUser?.uid;
    const currentUserEmail = auth.currentUser?.email;

    const feedbackInfos = {
        currentUserEmail: currentUserEmail,
        thoughts: textArea,
        createdAt: serverTimestamp()
    }

    alert("Thanks!, Your feedback has been sent");
    setTextArea("");
    await setDoc(doc(db, "feedback", currentUserId), feedbackInfos);
  }

    return (
        <View style={feedbackStyles.contentContainer}>
        {isInitialize ? (
            <ActivityIndicator size="large" color="black" />
        ) : (
            <>
            <Text style={feedbackStyles.textTitle}>I'm always looking to improve! If you have any 
            feedback or suggestions about your experience with the Programming Quiz App,
            feel free to share. Whether it’s a bug you’ve found, a feature you’d love to see,
            or anything else that could make the app better—I’m all ears!</Text>
            <TextInput 
            multiline
            style={feedbackStyles.input}
            placeholder="Suggestions, feedback, or bug reports? We'd love to hear from you!"
            numberOfLines={10}
            value={textArea!}
            onChangeText={setTextArea}/>
            <TouchableOpacity   style={feedbackStyles.button} disabled={isLoading ? true : false} onPress={handleSubmitFeedback}>
            {isLoading ? (
               <ActivityIndicator size="small" color={feedbackStyles.activityIndicator.color}/>
            ) : (
              <>
               <Text style={feedbackStyles.buttonTextTitle}>Submit</Text>
               <AntDesign style={feedbackStyles.antDesignIcon} name="arrowright" size={20} color={feedbackStyles.antDesignIcon.color} />
              </>
            )}
            </TouchableOpacity>
            </>
        )}
      </View>
    );
}
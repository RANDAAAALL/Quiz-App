import { useState, useEffect } from "react";
import { ActivityIndicator, Text, TouchableOpacity, Image } from "react-native";
import { settingStyles } from "@/stylesheets/settingStyles";
import { settingButtons } from "@/utils/buttons";
import { auth, sendPasswordResetEmail } from "@/config/firebase";
import useFirebaseDeletions from "@/utils/custom-hooks/useFirebaseDeletion";
import useInitializeApp from "@/utils/custom-hooks/useInitializeApp";
import useStoreImage from "@/utils/custom-hooks/useImagePicker";
import useFetchFirestore from "@/utils/custom-hooks/useFetchFirestore";

export default function Setting() {
  const { isInitialize, stopInitialize } = useInitializeApp(true);
  const { tempData } = useFetchFirestore("profile_picture_setting");
  const { handleDeleteAccount } = useFirebaseDeletions("settingScreen");
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const { pickImage } = useStoreImage();

  useEffect(() => {
    const timer = setTimeout(stopInitialize, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handlePress = async (index: number, type: string) => {
    setLoadingIndex(index);

    if(type === "Upload Profile Picture"){
      // alert("You clicked upload profile picture");
      await pickImage();
    }
    else if (type === "Delete Account") {
      await handleDeleteAccount();
    } else if (type === "Reset Password") {
      const email = auth.currentUser?.email;
      if (email) {
        await sendPasswordResetEmail(auth, email);
        alert("Reset password link sent!");
      }
    }
    setLoadingIndex(null);
  };

  if (isInitialize) return <ActivityIndicator size="large" color="black" />;

  return (
    <>
     <Text style={{textAlign: "center", marginVertical: 20}}>
        <Image 
        source={tempData ? {uri: tempData } : require('../../assets/images/person_image_placeholder.png')}
        style={settingStyles.image} />      
      </Text>
      {settingButtons.map((item, i) => (
        <TouchableOpacity
          key={i}
          style={settingStyles.button}
          disabled={loadingIndex !== null}
          onPress={() => handlePress(i, item.settingsButton)}>
          <Text style={settingStyles.buttonText}>
            {loadingIndex === i ? (
              <ActivityIndicator size="small" color="black" />
            ) : (
              item.settingsButton
            )}
          </Text>
        </TouchableOpacity>
      ))}
    </>
  );
}

import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import useLoading from "./useLoading";
import useStoreFirestore from "./useStoreFirestore";

export default function useStoreImage(){
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [ base64Image, setBase64Image ] = useState<string | null | undefined>(null);
  const storeImageFirestore = useStoreFirestore();

  const pickImage = async () => {
    startLoading();
    await new Promise(res => setTimeout(res,2000));
    
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.canceled) {
        const imageType = result.assets[0].type;
        const base64StringData = result.assets[0].base64;

        if(imageType !== "image"){
            alert("Please select an image!");
            return;
        }

        if(imageType && !base64StringData?.startsWith("data:image")){
            const actualBase64 = `data:${imageType};base64,${base64StringData}`;
            console.log("Image URI: ", `data:${imageType};base64,${actualBase64}`);
            setBase64Image(actualBase64);
            await storeImageFirestore!("profile_picture_setting", actualBase64);
            stopLoading();
        }
    }

  };

  return {
    isLoading,
    base64Image,
    pickImage
  }
}
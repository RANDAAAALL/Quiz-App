import { auth, db } from "@/config/firebase";
import { router } from "expo-router";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export default function useStoreFirestore(){
    const currentUser = auth.currentUser;

    // checks if user currently logged in!
    if(!currentUser){
        alert("You're not currently logged in!");
        router.replace("/screens/login");
        return;
    }

    // then proceed to "store" the base64 profile picture operation
    const storeImageFirestore = async (CollectionType: string ,base64Image: string) => {
        if(!CollectionType){
            alert("Please input a collection type!");
            return;
        }
        if(!base64Image){
            alert("Please select an image first!");
            return;
        }

        try{
            const imageUsersRef = doc(db, CollectionType, currentUser.uid);
            await setDoc(imageUsersRef, {
                profile_picture_base64: base64Image,
                currentUserEmail: currentUser.email,
                date_uploaded: serverTimestamp()
            })    
        }catch(error){
            alert("Firebase Error: " + error);
            console.log("Firebase Error: ", error);
        }
    }

    return storeImageFirestore;
}
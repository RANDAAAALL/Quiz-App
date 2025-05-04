import { auth, db, deleteUser } from "@/config/firebase";
import { router } from "expo-router";
import { collection, deleteDoc, doc, getDocs, query, serverTimestamp, setDoc, where, writeBatch } from "firebase/firestore";
import useLoading from "./useLoading";

export default function useFirebaseDeletions(screenName: string){
    const { isLoading, startLoading, stopLoading } = useLoading();

    console.log("Before deletion: UID: ", auth.currentUser?.uid);
    const handleDeleteAccount = async () => {
        // validate, if there is a value passed on screenName parameter
        if(screenName.trim() === ""){
            alert("Invalid no screenName value is being passed!");
            return;
        }
        console.log("After deletion: UID: ", auth.currentUser?.uid);

        startLoading();
        await new Promise(res => setTimeout(res, 2000));
        try{
        if(!auth.currentUser){
            console.log("You are not currently logged in!");
            router.replace("/screens/login");
            return;
        }
        const currentUserId = auth.currentUser?.uid;
        const currentUserEmail = auth.currentUser?.email;

        // list of all "collections" to delete based on the specific user only
        const collections = ["users",
                             "user_profiles",
                             "leaderboard",
                             "profile_picture_setting"
                            ];

        // these are the fields that should be store inside the collection named: "deleted"
        const DeletedUserInfos = {
            uid: currentUserId,
            email: currentUserEmail,
            deletedAt: serverTimestamp(),
        }
        
        // first, delete only selected collections on specific user
        // based on userID === documentID,
        const deleteDocs = collections.map((coll) => {
            console.log("Deleting Documents: ", coll);
            return deleteDoc(doc(db, coll, currentUserId));
        });
        
        // second, delete all the infos inside the collection named "quiz_histories"
        // on specific using userID == auth.currentUser.uid to the firestore
        const q = query(collection(db, "quiz_histories"), where("userID", "==", auth.currentUser?.uid));
        const querSnapShot = await getDocs(q);

        const batch = writeBatch(db);
        
        for (const docSnapShot of querSnapShot.docs) {
            batch.delete(docSnapShot.ref);
        }

        await Promise.all([...deleteDocs, batch.commit()]);
        
        // third, store the deleted currentUser details on the "deleted" collection
        // using the firebase auth
        setDoc(doc(db, "deleted", currentUserId), DeletedUserInfos);
        console.log("Store the Deleted User: ", auth.currentUser);
        
        // last, delete the currentUser details on the firebase authentication 
        console.log("Deleted User: ", auth.currentUser);
        await deleteUser(auth.currentUser);
        stopLoading();  

        // after all the firebase operations
        // navigate to the login screen
        router.replace("/screens/login");
        
    }catch(err){
        console.log("FirebaseError: ", err);
    }
    finally{
        stopLoading();
    }

}

return { isLoading, handleDeleteAccount }
}
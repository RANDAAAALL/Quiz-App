import { doc, increment, updateDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/config/firebase";
import { router } from "expo-router";

type collectionsType = {
    collectionName: string[],
    category: string,
    difficulty: string,
    questionsLimit: number,
    totalCorrectAnswer: number,
};

export default function useUpdateFirestore(){

    const currentUser = auth.currentUser;

    // checks if user currently logged in!
    if(!currentUser){
        alert("You're not currently logged in!");
        router.replace("/screens/login");
        return;
    }

    
    // then proceed to "update" operation
    const updateFirestore = async (Collections: collectionsType) =>{
    // checks if collectionName has a passed value
    if(!Collections){
        alert("Collections is currently empty!");
        return;
    }

        try{
            const usersRef = doc(db, Collections.collectionName[0], currentUser.uid);
            const leaderboardsRef = doc(db, Collections.collectionName[2], currentUser.uid);

            // update the values of collectionNamed: "user_profiles"
            await updateDoc(usersRef, {
                [Collections?.difficulty.charAt(0).toLowerCase() + Collections?.difficulty.slice(1)]: increment(1),
            });
            
            // add new random documentID and field values in collectionNamed: "quiz_histories"
            await addDoc(collection(db, Collections.collectionName[1]), {
                userID: currentUser.uid,
                category: Collections?.category,
                difficulty: Collections?.difficulty,
                questionsLimit: Collections?.questionsLimit,
                score: Collections?.totalCorrectAnswer,
                dateTake: serverTimestamp()
            });
            
            await updateDoc(leaderboardsRef, {
                totalAnsweredQuestions: increment(1),
                totalScores: increment(Collections?.totalCorrectAnswer)
            })
            
        }catch(error){
            console.log("Firebase Error: ", error);
        }
    }
    return updateFirestore;
}
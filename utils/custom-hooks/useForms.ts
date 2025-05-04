import { router } from "expo-router";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {serverTimestamp, setDoc, doc } from "firebase/firestore";
import { RegisterValidateForm } from "../validator/registerValidation";
import useHandleErrors from "./useHandleErrors";
import useLoading from "./useLoading";
import { auth, db, sendPasswordResetEmail } from "@/config/firebase";
import useListenerState from "./useListenerState";

export default function useFormSubmit(formValues: Record<string,string>, formType: string){
  const {handleErrors, setHandleErrors} = useHandleErrors();
  const { enableListener } = useListenerState();
  const {isLoading, startLoading, stopLoading } = useLoading();
  const errorMessages: Record<string, string> = {};

  const handleFormSubmit = async () => {   
      // reset errors, before validation
      setHandleErrors({}); 
      
      // handle loading state
      startLoading();
      await new Promise(res => setTimeout(res, 2000));

      try{
        let email, password, confirmPassword, result, errors: any = {};
            if(formType === "register") {
                ({email, password, confirmPassword } = formValues);
                 result = RegisterValidateForm(email, password, confirmPassword);
            }
            else if(formType === "login") ({email, password} = formValues);
            else if(formType === "reset-password") ({email} = formValues)
            else {
              console.log("formType doesn't exists!");
              return;
            }

            // checks if register form validation is invalid
            if (result?.error){
                result?.error.issues.forEach((error) => {
                  // collect all the errors
                  errorMessages[error.path[0]] = error.message; 
                });
                // store errors from "errorMessages" to "setHandlerErrors"
                setHandleErrors(errorMessages); 
                return;
            } 
            
            if(email.trim() === "") errors.email = "Invalid email must not be empty!";
            if(password?.trim() === "") errors.password = "Invalid password must not be empty!";
            if(Object.keys(errors).length > 0){
              setHandleErrors(errors)
              return;
            }
            
            // if custom register form validation is valid and formType is a "regsiter"
            // create user account with email and password to the Firebase
            if(formType === "register"){
              const registerInfos = await createUserWithEmailAndPassword(auth, email, password!);
            
              // store all the infos inside the "infosContainer"
              const infosContainer = {
                userInfos: {
                      uid: registerInfos.user.uid,
                      email: registerInfos.user.email,
                      createdAt: serverTimestamp()
                      },
                userProfileInfos: {
                      currentUserEmail: auth.currentUser?.email,
                      easy: 0,
                      medium: 0,
                      hard: 0,
                  },
                leaderboardInfos: {
                    userID: auth.currentUser?.uid ,
                    currentUser: auth.currentUser?.email?.split("@")[0],
                    totalAnsweredQuestions: 0,
                    totalScores: 0,
                    createdAt: serverTimestamp()
                  }
                };
              
                // store all the infos inside the "infosContainer" for each respective collections
                await setDoc(doc(db, "users", registerInfos.user.uid), infosContainer.userInfos);
                await setDoc(doc(db, "user_profiles", registerInfos.user.uid), infosContainer.userProfileInfos);
                await setDoc(doc(db, "leaderboard", registerInfos.user.uid), infosContainer.leaderboardInfos);
                stopLoading();
                
                setHandleErrors({"success": "valid"});
                console.log("Register: ", registerInfos);

                // after the user's registered their account
                // we need to signed out their account right away and enableListener function
                // to prevent the automatically signed in
                // as Firebase Authentication rules
                enableListener();
                await auth.signOut();
          
                // await new Promise(res => setTimeout(res,3000));
                // then navigate to login screen
                router.push("/screens/login");
                return;
            }

            // if the formType is a "login"
            // and we doesn't have a custom login form validation
            // and we let Firebase to provide a login form validation
            else if(formType === "login"){

              // login user account with email and password
                const userInfos = await signInWithEmailAndPassword(auth, email, password!);
                setHandleErrors({"success": "valid"});
                console.log("Login User: ", userInfos);
                
                // stop loading
                stopLoading();

                // and navigate to login screen
                router.replace("/auth/dashboard/mainScreen");

            }
            // if the formtype is "reset-password"
            else {
              await sendPasswordResetEmail(auth, email);
              setHandleErrors({"success": "valid"})
              stopLoading();
            }
         }
         // catch any other errors
         catch(error: any){
         if(formType === "reset-password" && error.code === "auth/invalid-email"){
            // setHandleErrors({"email": "Invalid Credenials!", "password": "Invalid Credentials!"});
            setHandleErrors({"email": "Invalid Email!"});
           }
        else if(error.code === "auth/email-already-in-use"){
            setHandleErrors({"email": "Email is already in use!"});
            // console.log("Email is already in use!: ", error.code);
            // console.log("Register: ", error.code);
         }
         else if(error.code === "auth/invalid-credential"){
            setHandleErrors({"email": "Invalid Credenials!", "password": "Invalid Credentials!"});
            // console.log("Login: ", error.code);
         }
         else if(error.code === "auth/invalid-email"){
          setHandleErrors({"email": "Invalid Credenials!", "password": "Invalid Credentials!"});
         }
         else {
            console.log(`${formType === "register" ? "Sign up failed: " + error.code : "Login failed: " + error.code }`);
         }
      }
      finally{
        // stop loading, if error only triggers
        stopLoading();
      }
   };
  return {isLoading, handleErrors, handleFormSubmit}
}
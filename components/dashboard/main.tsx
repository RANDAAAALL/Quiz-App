import useHandleSelections from "@/utils/custom-hooks/useHandleSelections";
import { ActivityIndicator, View } from "react-native";
import useLoading from "@/utils/custom-hooks/useLoading";
import useFetchRoute from "@/utils/custom-hooks/useFetchRoute";
import useQuestionStates from "@/utils/custom-hooks/useQuestionState";
import QuestionPortion from "./quiz-portion";
import { mainScreenStyles } from "@/stylesheets/main-screenStyles";
import DropDownPicker from "./drop-down";

export default function Main({ refresh } : any){
    const { isInitialize } = useFetchRoute("mainScreen", "GET");
    const { setHandleSelections, responseData, setResponseData } = useHandleSelections();
    const { isLoading, startLoading ,stopLoading } = useLoading();
    const { questionCategory, setQuestionCategory,
            difficultyLevel, setDifficultyLevel,
            questionsLimit, setQuestionsLimit,
            questionUID, setQuestionUID } = useQuestionStates();
    // console.log("main-component")

    const handleSelectionsSubmit =  async () => {
        setHandleSelections({});

        startLoading();
        await new Promise((res) => setTimeout(res, 2000));
        stopLoading();
        
        if(questionCategory === "Select Question Category" || difficultyLevel === "Select Difficulty Level") {
            alert("Please select a valid option!");
            return;
        }   
        
        if(questionsLimit?.trim() === "") {
            alert("Please input a number of questions above 0!");
            return
        }
        
        const intLimit = +questionsLimit!;
        if(isNaN(intLimit)){
            alert("Please input a valid number!");
            return;
        }

        if(intLimit > 20){
            alert("Please input a number of questions below 20!");
            return;
        }

        // store selected options in a state
        setHandleSelections({
            "question": questionCategory!,
            "difficulty": difficultyLevel!,
            "limit": intLimit.toString()!,
        });
        
        // reset
        setQuestionCategory(null);
        // setDifficultyLevel(null);
        setQuestionsLimit("");
        return;
    };

    return(
       <>
        <View style={mainScreenStyles.subContainer1}>
        {isInitialize ? (
           <ActivityIndicator style={mainScreenStyles.activityIndicationContainer} size="large" color="black"/>
           ) : (
            <>
            {/* render first "DropDownPicker" component content */}
            {/* responseData doesn't have a value at first render */}
            {!responseData ? (
                <DropDownPicker 
                 setQuestionCategory={setQuestionCategory}
                 setDifficultyLevel={setDifficultyLevel}
                 questionsLimit={questionsLimit}
                 setQuestionsLimit={setQuestionsLimit}
                 isLoading={isLoading}
                 handleSelectionsSubmit={handleSelectionsSubmit}
                />
            ) : (
                // question portions part
                <QuestionPortion 
                responseData={responseData}
                difficultyLevel={difficultyLevel}
                refresh={refresh}
                setHandleSelections={setHandleSelections}
                setQuestionCategory={setQuestionCategory}
                setDifficultyLevel={setDifficultyLevel}
                setQuestionsLimit={setQuestionsLimit}
                setResponseData={setResponseData}
                questionUID={questionUID}
                setQuestionUID={setQuestionUID}
                />
             )} 
          </>
         )
        }
     </View>
    </>
   );
}

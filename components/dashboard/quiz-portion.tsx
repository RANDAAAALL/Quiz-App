import { TouchableOpacity, View, Text, ActivityIndicator } from "react-native";
import QuizResult from "./quiz-result";
import { useEffect, useState } from "react";
import useLoading from "@/utils/custom-hooks/useLoading";
import useUpdateFirestore from "@/utils/custom-hooks/useUpdateFirestore";
import { quizPortionStyles } from "@/stylesheets/quiz-portionStyles";

export default function QuestionPortion({responseData,
                                        difficultyLevel,
                                        refresh,
                                        setHandleSelections,
                                        setQuestionCategory,
                                        setDifficultyLevel,
                                        setQuestionsLimit,
                                        setResponseData
                                         }: any){
    const [ currentQuizIndex, setCurrentQuizIndex ] = useState<number>(0);
    const [ currentQuiz, setCurrentQuiz ] = useState<any>();
    const { isLoading, startLoading, stopLoading } = useLoading();
    const [ isClicked, setIsClicked ] = useState<boolean>(false);
    const [ correctAnswers, setCorrectAnswer ] = useState<number>(0);
    const [ isCorrect, setIsCorrect ] = useState<boolean | null>(null);
    const [ answerIndex, setAnswerIndex ] = useState<number | null>(null);
    const updateFirestore = useUpdateFirestore();
    console.log("question-portion-component triggered");

    useEffect(() => {
        if(responseData){            
            startLoading();
            console.log("Difficulty: ", difficultyLevel);
            console.log("Current Index: ", currentQuizIndex+1);
            setCurrentQuiz(responseData[currentQuizIndex]);
            
            // store the "difficulty level" to the firestore
            // when the currentQuizIndex is execeed of responseData.length
            if(currentQuizIndex > responseData.length - 1){
                console.log("Quiz Ended");
                console.log("Difficulty: ", difficultyLevel);
                
                const update = async () => {
                    await updateFirestore?.({
                        collectionName: ["user_profiles", "quiz_histories", "leaderboard"],
                        category: currentQuiz.category,
                        difficulty: difficultyLevel,
                        questionsLimit: responseData.length,
                        totalCorrectAnswer: correctAnswers,
                      });
                }

                update();
            }
            setTimeout(() => {
                stopLoading();
            }, 1000);
        }
    }, [responseData, currentQuizIndex]);
    
    const handleNextQuiz = async ( usersPickedAnswer: string, usersPickedAnswerIndex: number) => {
        // flag for disblabing the button
        setIsClicked(true);

        // extract the picked index for bg-color and text color purposes
        setAnswerIndex(usersPickedAnswerIndex);

        // approach: to extract the correct the answers that has a "true" value
        // we will use filter and slice for extarction
        const correctAnswerKey = Object.entries(currentQuiz?.correct_answers && currentQuiz?.correct_answers)
        .filter(([_, value]) => value !== "false")[0][0].slice(0,8);

        // then compare the "key" answer on  === user's "picked" answer
        if(correctAnswerKey === usersPickedAnswer){
            console.log("1. You are correct!");
            setCorrectAnswer(prev => prev+1);
            setIsCorrect(true);
        }
        else {
            console.log("1. You are wrong!");
            setIsCorrect(false);
        }

        console.log("2. Your answered: ", usersPickedAnswer);
        console.log("3. Correct Answer: ", correctAnswerKey);
        
        // show delay for showing if it's correct or wrong
        await new Promise(res => setTimeout(res,2000));

        // increment the currentAnswerIndex to move another question portion
        if( responseData && currentQuizIndex < responseData.length){
            setCurrentQuizIndex(prev => prev+1);
            
            // reset the boolean
            setIsCorrect(null);
            setIsClicked(false);
        }
    };

    // handle for reset the full component of mainScreen
    // and re-rechoose question category
    const HandleTryAgain = () => {
        setCorrectAnswer(0);
        setCurrentQuizIndex(0);
        setHandleSelections(null);
        setQuestionCategory(null);
        setDifficultyLevel(null);
        setQuestionsLimit("");
        setResponseData([]);
        setIsCorrect(null);
        setAnswerIndex(null);
        refresh();
    }

    return  (
        <>
         { isLoading ? ( 
                <ActivityIndicator style={quizPortionStyles.activityIndicationContainer} size="large" color="black"/> 
         ) : (
            <View style={quizPortionStyles.subContainer1}>
             {currentQuizIndex <= responseData.length && currentQuiz?.answers ? (
            <>
             <View style={quizPortionStyles.container}>
             <Text style={quizPortionStyles.quizNumber}>{`${currentQuizIndex+1}/${responseData.length}`}</Text>
             <Text style={quizPortionStyles.quizCategory}>{`Category: ${currentQuiz?.category}`}</Text>
             <Text style={quizPortionStyles.quizDifficulty}>{`Mode: ${currentQuiz?.difficulty}`}</Text>
             </View>
             <Text style={quizPortionStyles.quizQuestion}>{currentQuiz?.question}</Text>
             {Object.entries(currentQuiz.answers)
             .filter(([key, value]) => key !== null && value !== null) 
             .map(([key, value], i: number) => (
                 <TouchableOpacity
                 key={i}
                 style={[{backgroundColor: isClicked && answerIndex === i? "black" : undefined},quizPortionStyles.quizChoicesButton]}
                 disabled={isClicked ? true : false}
                 onPress={() => handleNextQuiz(key, i)}>
                 <Text style={[{color: isClicked && answerIndex === i ? "white" : undefined},quizPortionStyles.quizChoicesButtonText]}>{`${value}`}</Text>
                 </TouchableOpacity> 
             ))}
             {/* display text if it's correct or incorrect */}
             {isCorrect !== null && (
                 <Text style={[quizPortionStyles.quizErrorTexts, {color: isCorrect ? "green" : "red"}]}>{`${isCorrect ? "You are correct!" : "You are wrong!"}`}</Text>
                 )}
             </>
             ) : (
                 // display the total results
                 <QuizResult
                 HandleTryAgain={HandleTryAgain}
                 correctAnswers={correctAnswers}
                 responseData={responseData}/>
                 )}
            </View>
          )
        }
      </> 
    );
}
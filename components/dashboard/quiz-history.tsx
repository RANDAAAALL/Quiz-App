import { quizHistoryStyles } from "@/stylesheets/quiz-historyStyles";
import useFetchFirestore from "@/utils/custom-hooks/useFetchFirestore";
import useInitializeApp from "@/utils/custom-hooks/useInitializeApp";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { List, Surface } from "react-native-paper";

export default function QuizHistory(){    
    const [ expandedIndex, setExpandedIndex ] = useState<number | null>(null);
    const { tempData } = useFetchFirestore("quiz_histories");
    const {isInitialize ,stopInitialize} = useInitializeApp(true);
    // console.log("tempData: ", tempData);

    useEffect(() => {
        const delay = async () => {
            await new Promise(res => setTimeout(res,2000));
            stopInitialize();
        }
        delay();
    },[isInitialize]);

return (
    <View style={quizHistoryStyles.subContainer}>
      {isInitialize ? (
        <ActivityIndicator style={quizHistoryStyles.activityIndicationContainer}  size="large" color="black" />
      ) : (
        <>
          {!tempData || Object.keys(tempData).length <= 0 ? (
            <View style={quizHistoryStyles.currentEmptyTextContainer}>
            <Text style={quizHistoryStyles.currentEmptyTextTile}>Currently empty!</Text>
            </View>
          ) : (
            <> 
              {Array.isArray(tempData) && tempData.map((data, index) => (
                  <Surface key={index} style={quizHistoryStyles.surface}>
                  <List.Accordion
                    title={`quizID#${data?.id}`}
                    expanded={expandedIndex === index}
                    onPress={() => setExpandedIndex(expandedIndex === index ? null : index)}>
                    <List.Item title={`Category: ${data?.category}`}/>
                    <List.Item title={`Difficulty: ${data?.difficulty}`} />
                    <List.Item title={`Score: ${data?.score}/${data?.questionsLimit}`} />
                    <List.Item title={`Date: ${data?.dateTake?.toDate().toLocaleString("en-PH", { timeZone: "Asia/Manila" })}`} />
                  </List.Accordion>
                </Surface>
              ))} 
            </>
          )}
        </>
      )}
    </View>
  );
}
import { useEffect, useState } from "react";

export default function useHandleSelections() {
    const [selectSelections, setHandleSelections] = useState<any>();
    const [responseData, setResponseData] = useState<any[]>();

    useEffect(() => {
    console.log("1st. Received", selectSelections);
    
    // if there is no data in the state
    if(!selectSelections || !selectSelections.question || !selectSelections.limit) return;

    const handleRequest = async () => {

        // shows alert if user select default options
        if(selectSelections?.question === "Select Question Category" ||
           selectSelections?.difficulty === "Select Difficulty Level" ||
           selectSelections?.question === "" ||
           selectSelections?.difficulty === "") {
            alert("Please select a valid option!");
            return;
        }

        // console.log("2. Selected options: ", selectSelections);

        try{
            const response = await fetch(`https://quizapi.io/api/v1/questions?apiKey=${process.env.EXPO_PUBLIC_QUIZ_API_KEY}
                                         &category=${selectSelections?.question}
                                         &difficulty=${selectSelections?.difficulty}
                                         &limit=${selectSelections?.limit}`,{
                method: "GET",
                headers: {"Content-Type": "application/json"}
            })

            const data = await response.json();
            if(response.ok){
                console.log("Data: ", data);
                setResponseData(data);
            }
            
        }catch(err){
            console.log(err);
        }
    }

    handleRequest();

    }, [selectSelections]);
    
    return { selectSelections, setHandleSelections, responseData, setResponseData};
}
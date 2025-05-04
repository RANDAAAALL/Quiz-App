import { useState } from "react";

export default function useQuestionStates(){
    const [questionCategory, setQuestionCategory] = useState<string | null>(null);
    const [difficultyLevel, setDifficultyLevel] = useState<string | null>(null);
    const [questionsLimit, setQuestionsLimit] = useState<string | undefined>("");
    const [ questionUID, setQuestionUID ] = useState<string | null>(null);

    return {
        questionCategory,
        setQuestionCategory,
        difficultyLevel,
        setDifficultyLevel,
        questionsLimit,
        setQuestionsLimit,
        questionUID,
        setQuestionUID,
    };
}
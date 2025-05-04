import { useState } from "react";


export default function useListenerState(){
    const [isListenerActive, setIsListenerActive] = useState<Boolean>(true);
    const enableListener = () => setIsListenerActive(true);
    const disableListener = () => setIsListenerActive(false);

    return{
        isListenerActive,
        enableListener,
        disableListener
    };
}
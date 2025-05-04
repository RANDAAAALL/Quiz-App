import { useState } from "react"

export default function useInitializeApp(data: boolean){
    const [isInitialize, setIsInitialize] = useState(data);

    const startInitiazelize = () => setIsInitialize(true);
    const stopInitialize = () => setIsInitialize(false);

    return {isInitialize, startInitiazelize, stopInitialize };
}
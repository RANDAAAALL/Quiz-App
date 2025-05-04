import { useState, useEffect } from "react";

export default function useHandleErrors(){
    const [handleErrors, setHandleErrors] = useState<Record<string,string>>();

    useEffect(() => { if(handleErrors) setHandleErrors(handleErrors); }, [handleErrors]);
    
    return { handleErrors, setHandleErrors};
}
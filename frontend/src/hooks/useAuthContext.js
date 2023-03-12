import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const useAuthContext=()=>{
    const context=useContext(AuthContext)
    if(!context){
        console.log('context not availlable')
    }
    return context
}
import { useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"


export const useLoginForm=()=>{
    const [error,setError]=useState(null)
    const [succcess, setSuccess]=useState(null)
    const {dispatch}=useAuthContext()
    const loginForm= async (email, password)=>{
    
        const response= await fetch('http://127.0.0.1:3001/api/users/login', {
            method:'POST',
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify({email, password})
        })
        const json= await response.json()
        

        if (response.ok){
            console.log('login succcess')
            setSuccess('Login is successfull')
            setError(null)
            
            //save token to local storage
            localStorage.setItem('user', JSON.stringify(json))
            //update the authContext
            dispatch({type:'LOGIN', payload:json})
            
        }
        if(!response.ok){
            setSuccess(null)
            setError(json.error)
        }

        
    }
    return {loginForm, succcess, error} 
}
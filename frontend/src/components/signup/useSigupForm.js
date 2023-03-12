import { useAuthContext } from "../../hooks/useAuthContext"
import { useState } from "react"



export const useSignupForm=()=>{
    const {dispatch}=useAuthContext()
    const [error,setError]=useState(null)
    const [succcess, setSuccess]=useState(null)
    const signupForm= async (email, password)=>{
    
        const response= await fetch('http://127.0.0.1:3001/api/users/signup', {
            method:'POST',
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify({email, password})
        })
        const json= await response.json()
        

        if (response.ok){
            setSuccess('Signup success')
            setError(null)
            console.log('users added successfully')
            
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
    return {signupForm, succcess, error}
}
import { useState } from "react";
import { useSignupForm } from "./useSigupForm";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Navigate } from "react-router-dom";

export const SignupUsers=()=>{
    const {user}=useAuthContext()
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const {signupForm, succcess, error}=useSignupForm()

    if(user){
        return <Navigate to={'/'}/>
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        signupForm(email, password)

        setEmail('')
        setPassword('')
    }
    return(
        <div className="usersForm-div-1">
            <h3>Signup</h3>
            <form onSubmit={handleSubmit}>
                <label >Email</label>
                <input 
                    type="text"
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <label >password</label>
                <input 
                    type="text"
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button>Signup</button>
                {error && <div>{error}</div>}
                {succcess && <div>{succcess}</div>}
            </form>
        </div>
    )
}
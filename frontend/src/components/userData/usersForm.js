import { useState } from "react";
import { useUsersForm } from "./useUsersForm";

export const UsersForm=()=>{
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const {usersForm}=useUsersForm()

    const handleSubmit=(e)=>{
        e.preventDefault()
        usersForm(email, password)

        setEmail('')
        setPassword('')
    }
    return(
        <div className="usersForm-div-1">
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
                <button>Add Users</button>
            </form>
        </div>
    )
}
//import { useFetch } from "../hooks/useFetch";
import { useEffect } from "react"
import { UserDetails } from "./userDetails"
import { useAuthContext } from "../../hooks/useAuthContext"
import './usersData.css'

export const UsersData=()=>{
    //const {data:users}=useFetch('http://127.0.0.1:3001/api/users')
    const {users, dispatch}=useTimeTableContext()
    const {user}=useAuthContext()
    useEffect(()=>{
        const fetchData= async ()=>{
            const response=await fetch('http://127.0.0.1:3001/api/users')
            const json=await response.json()
            if(response.ok){
                dispatch({type:'SET_USERS',payload:json})
            }
        }
        if(user){
            fetchData()
        }
        
    },[dispatch, user])
    return(
        <div className="usersData-div-1">
            {users && users.map((user)=>{
                return(
                   <UserDetails user={user} key={user.user_id}/>
                )
            })}
        </div>
    )
}
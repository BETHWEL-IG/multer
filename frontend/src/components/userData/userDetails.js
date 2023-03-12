
import { useAuthContext } from "../../hooks/useAuthContext";
import '.usersData.css'

export const UserDetails=({user})=>{
    const {dispatch}=useTimeTableContext()
    const{user:user1}=useAuthContext()
    if(!user1){
        return
    }
    const handleDelete=async ()=>{
        
        const response= await fetch('http://127.0.0.1:3001/api/users/' + user.user_id ,{
            method: 'DELETE',
            headers:{"Authorization":`Bearer ${user.token}`}
            
        })
        if(response.ok){
            const fetchUsers=async ()=>{
                const response=await fetch('http://127.0.0.1:3001/api/users/',{
                    headers:{"Authorization":`Bearer ${user.token}`}
                })
                const json=await response.json()
                if(response.ok){
                    //dispatch global state
                    dispatch({type:'DELETE_USERS',payload:json})
                }
            }
            fetchUsers()
            console.log('data deleted successfully')
            
        }else
        console.log('error occured while deleting')
    }
    return(
        <div className="userDetails-div-1">
            <h3>{user.email}</h3>
            <p>{user.user_id}</p>
            <button className="usersBtn" onClick={handleDelete}>Delete User</button>
        </div>
    )
}
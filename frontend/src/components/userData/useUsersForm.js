

export const useUsersForm=()=>{
    const usersForm= async (email, password)=>{
        const response= await fetch('http://127.0.0.1:3001/api/users', {
            method:'POST',
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify({email, password})
        })
        const json= await response.json()
        
    }
    return {usersForm}
}
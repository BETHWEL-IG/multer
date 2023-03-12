import { useAuthContext } from "./useAuthContext";

export const useLogout=()=>{
    const {dispatch}=useAuthContext()
    const logout =()=>{
        // remove data from local storage
        localStorage.removeItem('user')
        console.log('logout success')

        //dispatch global data 
        dispatch({type:"LOGOUT"})

    }
    return {logout}
}
import { createContext, useEffect, useReducer } from "react";

export const AuthContext=createContext()
export const reducer=(state, action)=>{
    switch(action.type){
        case 'LOGIN':
            return{
                user:action.payload
            }
        case 'LOGOUT':
            return{
                user:null
            }
        case 'DELETE_USERS':
            return{
                users:action.payload
            }
        case 'SET_USERS':
            return{
                users:action.payload
            }
        default:
            return state
    }
}

export const AuthContextProvider=({children})=>{
    const[state, dispatch]=useReducer(reducer, {user:null})
    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem('user'))
        if(user){
            dispatch({type:'LOGIN', payload:user})
        }
    },[])
    console.log('AuthContextState', state)
    return(
        <div className="authContext-div-1">
            <AuthContext.Provider value={{...state, dispatch}}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}
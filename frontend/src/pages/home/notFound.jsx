import { NavLink } from "react-router-dom"


export const NotFound=()=>{
    return(
        <>
            <p>The requested page does not exist</p>
            <NavLink  to={'/'}>Homepage</NavLink>
        </>
    )
}
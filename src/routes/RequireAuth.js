import { useLocation, Navigate, Outlet } from "react-router-dom"
import jwt_decode from "jwt-decode";

import useAuth from "../hooks/useAuth"


function RequireAuth ({allowedRole}) {
    const {auth} = useAuth();
    const location = useLocation()

    // decode token from auth context
    const decode = auth?.token
     ? jwt_decode(auth.token)
     : undefined

     const userRole = decode?.role_code

     console.log("decode requireAuth = ", decode)

    // console.log(" auth requireAuth = ", auth);
    console.log("is valid Role =", !!allowedRole?.find(role => userRole === role))
    return (
        !!allowedRole?.find(role => userRole === role)
        ? <Outlet/>
        : Object.keys(auth).length !== 0
            ? <Navigate to="/unauthorized" state={{from: location}} replace/>
            : <Navigate to="/login" state={{from: location}} replace/>
       )
    
}

export default RequireAuth
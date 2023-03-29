import { useContext } from "react";
import {AuthContext} from '../store/AuthContext'

function useAuth() {
    const {auth, setAuth, persist, setPersist}  = useContext(AuthContext)
    return {auth, setAuth, persist, setPersist}
}

export default useAuth

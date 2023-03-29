import request from "../utils/request";
import useAuth from "./useAuth";

const useLogout = () => {
    const {setAuth} = useAuth()

    const logout = async () => {
        try {
            setAuth({})
            await request.get("/auth/logout")
        } catch (error) {
            console.log({messgae: error})
        }
    }
    return logout
}

export default useLogout
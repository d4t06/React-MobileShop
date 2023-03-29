import request from "../utils/request"
import useAuth from "./useAuth"

const useRefreshToken = () => {
    const {setAuth} = useAuth()

    const refresh = async () => {
        try {
            const response = await request.get("/auth/refresh")
    
            setAuth(prev => {
                const newToken = response.data.token
                return {...prev, token: newToken}
            })
            return response.data.token
        } catch (error) {
            console.log({message: error})
        }
    }
    return refresh
}

export default useRefreshToken
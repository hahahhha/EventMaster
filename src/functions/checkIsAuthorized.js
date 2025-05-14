import axios from "axios"
import { API_URL } from "../confing";


export default async () => {
    try {
        const res = await axios.get(`${API_URL}/api/auth/checkAuth`, { 
            withCredentials: true 
        });
        // console.log(res);
        return res.data.isAuthenticated;
    } catch (error) {
        console.log("Пользователь не авторизован");
        return false;
    }
};
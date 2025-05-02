import axios from "axios"
import { API_URL } from "../confing";


export default async () => {
    try {
        // Отправляем запрос к защищенному эндпоинту
        const res = await axios.get(`${API_URL}/api/checkAuth`, { 
            withCredentials: true 
        });
        return res.data.isAuthenticated;
    } catch (error) {
        console.log("Пользователь не авторизован");
    }
};
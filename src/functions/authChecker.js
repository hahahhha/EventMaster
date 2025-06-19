import axios from "axios";

async function authChecker(navigate, link) {
    try {
        const response = await axios.get('/api/auth/checkAuth', {withCredentials: true});
        if (!response.data.isAuthenticated) {
            navigate(`/login?redir=${encodeURIComponent(link)}`);
        }
    } catch (error) {
        navigate(`/login?redir=${encodeURIComponent(link)}`);
    }
}

export default authChecker;
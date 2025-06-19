import axios from "axios";

const adminOrOrganizerCheck = async (link, navigate) => {
  try {
    const response = await axios.get('/api/auth/me/check-organizer-or-admin', { withCredentials:true });
    if (!response.data.isAdminOrOrganizer) {
      navigate(`/login?redir=${encodeURIComponent(link)}`);
    }
  } catch (error) {
    navigate(`/login?redir=${encodeURIComponent(link)}`);
  }
}

export default adminOrOrganizerCheck;
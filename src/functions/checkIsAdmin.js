import React from "react";
import axios from "axios";

const checkIsAdmin = async (link, navigate) => {
  try {
    const response = await axios.get('/api/auth/me/check-admin-role', { withCredentials:true });
    if (!response.data.isAdminRole) {
      navigate(`/login?redir=${encodeURIComponent(link)}`);
    }
  } catch (error) {
    navigate(`/login?redir=${encodeURIComponent(link)}`);
  }
}

export default checkIsAdmin;
import { useEffect } from "react";
import axiosInstance from "../auth/axios";

const RefreshAccess = () => {
  useEffect(() => {
    const refreshToken = localStorage.getItem("refresh");

    if (refreshToken) {
      const interval = setInterval(() => {
        axiosInstance
          .post("http://localhost:8000/api/v1/token/refresh/", {refresh: refreshToken})
          .then((res) => {

            localStorage.setItem("access", res.data.access);
          })
          .catch((err) => {
            console.error("Error refreshing access token:", err);
          });
      }, 4 * 60000); // Refresh token every 4 minutes

      // Cleanup the interval on component unmount
      return () => clearInterval(interval);
    }
  }, []); // Empty dependency array ensures this effect runs once

  return null; // No UI to render
};

export default RefreshAccess;

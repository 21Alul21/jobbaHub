import { Navigate, Outlet  } from "react-router-dom";

const Protected = () => {

    const loggedIn = localStorage.getItem('access');
        return loggedIn ? <Outlet /> : <Navigate to="/login"/>; 
    }



export default Protected;
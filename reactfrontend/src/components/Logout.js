import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () =>{

    const navigate = useNavigate();

    useEffect(() =>{

        localStorage.removeItem("access");
        navigate("/login");

    }, [navigate]
    );

    
};

export default Logout;
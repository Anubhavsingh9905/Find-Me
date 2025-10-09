import React, { use } from "react";
import { useAuth } from './AuthProvider';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
    const navigate = useNavigate();

    const {isLoggedIn, setIsLoggedIn} = useAuth();

    const handleLogout = async(e) => {
        console.log("logout");
        try{
            let response = await axios.get("https://find-me-v4yl.onrender.com/email/logout", { withCredentials: true });
            console.log(response.data);
            setIsLoggedIn(false);
            navigate("/");
        }
        catch(err){
            if(err.response && err.response.data && err.response.data.message){
                alert(`Error : ${err.response.data.message}`);
                console.log(err.response.data.message);
            }
            else{
                alert(`Error: ${err.message}`);
                console.log(err.message);
            }
        }
    }
    
    if(!isLoggedIn) return null;

    return(
        <ul>
            <li onClick={handleLogout}>
                <a href="#" className="hover:text-blue-600 transition-colors">LogOut</a>
            </li>
        </ul>
    )
}

export default LogOut;
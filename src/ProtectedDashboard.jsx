import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./components/AuthProvider";
import CctvView from "./components/CctvView";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ReportSighting from "./components/ReportSighting";
import UploadPhoto from "./components/UploadPhoto";
import Dashboard from "./pages/Dashboard";


function ProtectedDashboard(){
    let navigate = useNavigate();
    let {isLoggedIn, isLoading} = useAuth();

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            console.log("login to aceess dashboard");
            navigate("/login");
        }
    }, [isLoggedIn, navigate, isLoading]);

    return(
        <>
            <Navbar/>
            <Dashboard/>
            <UploadPhoto/>
            <CctvView/>
            <ReportSighting/>
            <Footer/>
        </>
    )
}

export default ProtectedDashboard;
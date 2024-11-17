import { Navigate, Outlet } from "react-router-dom";
import React from "react";

const ProtectedRoutes = ()=>{

    const auth = localStorage.getItem("userlogin");
    return auth ? <Outlet/> : <Navigate to={"/login"}/>
};

export default ProtectedRoutes;


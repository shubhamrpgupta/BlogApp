import React from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";


const AuthLayout = ({ children, authentication = true }) => {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        if (authentication && authentication !== authStatus) {
            navigate("/login")
        } else if (!authentication && authentication !== authStatus) {
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])


    return loader ? <h1>Loading...</h1> : <>{children}</>
}

export default AuthLayout
import React from 'react';
import { useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import appwriteAuthService from "../../appwrite/auth_service";

const LogoutBtn = () => {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        appwriteAuthService.logoutUser()
            .then(() => {
                dispatch(logout())
            })
    }
    return (
        <button
            className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
            onClick={logoutHandler}
        >
            Logout
        </button>
    )
}

export default LogoutBtn;
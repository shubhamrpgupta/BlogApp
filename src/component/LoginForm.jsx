import React from 'react';
import { login as authLogin } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import appwriteAuthService from "../appwrite/auth_service";
import Logo from "./Logo";
import CustomInput from "./CustomInput";
import CustomBtn from "./CustomBtn";

const LoginForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();

    const loginUser = async (data) => {
        setError("")
        try {
            const sessionReturn = await appwriteAuthService.loginUser(data);
            if (sessionReturn) {
                const currentUserData = await appwriteAuthService.getCurrentUser();
                if (currentUserData) {
                    return dispatch(authLogin({ userData: currentUserData }))
                }
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div
                className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
            >
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign in to your account
                </h2>

                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {
                    error && <p className="text-red-600 mt-8 text-center">{error}</p>
                }

                <form onSubmit={handleSubmit(loginUser)} className="mt-8">
                    <div className='space-y-5'>
                        <CustomInput
                            label="Email :"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Incorrect email or password",
                                }
                            })}
                        />

                        <CustomInput
                            type="password"
                            label="Password :"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                                // pattern: {
                                //     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                //     message: "Password must have 8 characters"
                                // }
                            })}
                        />

                        <CustomBtn
                            type="submit"
                            text="Log In"
                            classname="w-full"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm
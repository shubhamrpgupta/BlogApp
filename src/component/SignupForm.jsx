import React from 'react';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import appwriteAuthService from "../appwrite/auth_service";
import { login as authLogin } from "../slices/authSlice";
import Logo from "./Logo";
import CustomInput from "./CustomInput";
import CustomBtn from "./CustomBtn";


const SignupForm = () => {

    const [error, setError] = useState("");
    const disptach = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const signupUser = async (data) => {
        setError("");
        try {
            const newUserData = await appwriteAuthService.createAccount(data)
            if (newUserData) {
                const currentUserData = await appwriteAuthService.getCurrentUser()
                if (currentUserData) {
                    console.log(currentUserData)
                    return disptach(authLogin({ userData: currentUserData }));
                }
                navigate("/")
            }

        } catch (error) {
            setError(error.message)
        }

    }

    return (
        <div className="flex items-center justify-center">
            <div
                className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
            >

                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign up to create an account
                </h2>

                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Log In
                    </Link>
                </p>

                {
                    error && <p className="text-red-600 mt-8 text-center">{error}</p>
                }

                <form onSubmit={handleSubmit(signupUser)} className="mt-8">
                    <div className='space-y-5'>
                        <CustomInput
                            type="text"
                            label="Full Name :"
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                                // pattern: {
                                //     value: /^[A-Za-z]+$/,
                                //     message: "Please use Alphabet Only"
                                // }
                            })}
                        />

                        <CustomInput
                            label="Email :"
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                                // pattern: {
                                //     value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                                //     message: "Please enter valid Email"
                                // }
                            })}
                        />

                        <CustomInput
                            label="Password :"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                                // pattern: {
                                //     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                //     message: "Please enter 8 characters"
                                // }
                            })}
                        />

                        <CustomBtn
                            type="submit"
                            classname="w-full"
                            text="Create Account"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignupForm
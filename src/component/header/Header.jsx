import React from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Container from "../container/Container";
import Logo from "../Logo";
import LogoutBtn from "./LogoutBtn";

const Header = () => {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            url: "/",
            active: true
        },
        {
            name: "Login",
            url: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            url: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            url: "/allposts",
            active: authStatus,
        },
        {
            name: "Add Post",
            url: "/newpost",
            active: authStatus,
        },
    ]

    return (
        <header className="py-3 shadow bg-blue-500">
            <Container>
                <nav className="flex">
                    <div className="mr-4">
                        <Link>
                            <Logo width="70px" />
                        </Link>
                    </div>
                    <ul className='flex ml-auto'>
                        {
                            navItems.map((item) => item.active ? (
                                <li
                                    key={item.name}
                                >
                                    <button
                                        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                                        onClick={() => navigate(item.url)}
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null)
                        }
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header
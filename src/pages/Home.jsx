import React from 'react';
import { useEffect } from "react";
import { useState } from "react";
import appwriteDbService from "../appwrite/database_service";
import Container from "../component/container/Container";
import BlogCard from "../component/BlogCard";
import { useSelector } from "react-redux";

const Home = () => {

    const currentUserData = useSelector(state => state.auth.status);

    const [allPosts, setAllPosts] = useState([]);
    useEffect(() => {
        appwriteDbService.getAllPosts()
            .then((totalPosts) => {
                if (totalPosts) {
                    setAllPosts(totalPosts.documents)
                }
            })
    }, [])

    if (currentUserData === true) {
        if (allPosts.length > 0) {
            return (
                <div className="w-full py-8">
                    <Container>
                        <div className="flex flex-wrap">
                            {
                                allPosts.map((singlePost) => {
                                    <div key={singlePost.$id} className="p-2 w-1/4">
                                        {console.log(singlePost)}
                                        <BlogCard
                                            $id={singlePost.$id}
                                            title={singlePost.title}
                                            featuredImage={singlePost.featuredImage}
                                        />
                                    </div>
                                })
                            }
                        </div>
                    </Container>
                </div>
            )
        } else {
            return (
                <div className="w-full py-8 mt-4 text-center">
                    <Container>
                        <div className="flex flex-wrap">
                            <div className="p-2 w-full">
                                <h1 className="text-2xl font-bold hover:text-gray-500">
                                    There is no blogs
                                </h1>
                            </div>
                        </div>
                    </Container>
                </div>

            )
        }
    } else {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Please login to read the blogs
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}

export default Home
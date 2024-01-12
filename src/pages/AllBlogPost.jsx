import React from 'react'
import { useEffect } from "react";
import { useState } from "react"
import appwriteDbService from "../appwrite/database_service";
import Container from "../component/container/Container";
import BlogCard from "../component/BlogCard";

const AllBlogPost = () => {

    const [allPosts, setAllPosts] = useState([]);
    useEffect(() => {
        appwriteDbService.getAllPosts([])
            .then((totalPosts) => {
                if (totalPosts) {
                    setAllPosts(totalPosts.documents)
                }
            })
    }, [])

    return (
        <div className="py-8">
            <Container>
                <div className="flex flex-wrap">
                    {
                        allPosts.map((singlePost) => (
                            <div key={singlePost.$id} className="p-2 w-1/4">
                                <BlogCard
                                    $id={singlePost.$id}
                                    title={singlePost.title}
                                    featuredImage={singlePost.featuredImage}
                                />
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}

export default AllBlogPost
import React from 'react';
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import appwriteDbService from "../appwrite/database_service";
import Container from "../component/container/Container";
import BlogPostForm from "../component/blogpost_form/BlogPostForm";

const EditBlogPost = () => {

    const navigate = useNavigate();
    const { uniqueId } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        if (uniqueId) {
            appwriteDbService.getPost(uniqueId)
                .then((singlePost) => {
                    if (singlePost) {
                        setPost(singlePost)
                    }
                })
        } else navigate("/")
    }, [uniqueId, navigate])

    return post ? (
        <div className="py-8">
            <Container>
                <BlogPostForm existingPost={post} />
            </Container>
        </div>
    ) : null;
}

export default EditBlogPost
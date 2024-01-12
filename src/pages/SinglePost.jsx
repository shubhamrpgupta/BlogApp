import React from 'react'
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import appwriteDbService from "../appwrite/database_service";
import Container from "../component/container/Container";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import CustomBtn from "../component/CustomBtn";

const SinglePost = () => {

    const [singlePost, setSinglePost] = useState({});
    const [imgSrc, setImgSrc] = useState("");
    const { uniqueId } = useParams();
    const navigate = useNavigate();

    const currentUserData = useSelector((state) => state.auth.userData);

    const isAuthor = singlePost && currentUserData ? singlePost.userId === currentUserData.$id : false;

    useEffect(() => {
        if (uniqueId) {
            appwriteDbService.getPost(uniqueId)
                .then((post) => {
                    if (post) {
                        setSinglePost(post);
                        setImgSrc(post.featuredImage);
                    }
                    else navigate("/")
                })
        } else navigate("/")
    }, [uniqueId, navigate]);

    const deletePost = () => {
        appwriteDbService.deletePost(singlePost.$id)
            .then((status) => {
                if (status) {
                    appwriteDbService.deleteFile(imgSrc);
                    navigate("/allposts")
                }
            })
    }

    return singlePost ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2"
                >
                    <img
                        className="rounded-xl"
                        src={appwriteDbService.getFilePreview(imgSrc)}
                        alt={singlePost.title} />
                    {
                        isAuthor && (
                            <div className="absolute right-6 top-6">

                                <Link to={`/post/edit/${singlePost.$id}`}>
                                    <CustomBtn
                                        bgColor="bg-green-500"
                                        className="mr-3"
                                        text="Edit"
                                    />
                                </Link>

                                <CustomBtn
                                    text="Delete"
                                    bgColor="bg-red-500"
                                    onClick={deletePost}
                                />
                            </div>
                        )
                    }
                </div>

                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{singlePost.title}</h1>
                </div>

                {/* <div>
                    {parse(singlePost.content)}
                </div> */}
            </Container>
        </div>
    ) : null;
}

export default SinglePost
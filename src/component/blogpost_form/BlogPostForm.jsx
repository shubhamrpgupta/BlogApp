import React from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import appwriteDbService from "../../appwrite/database_service";
import CustomInput from "../CustomInput";
import CustomEditor from "../CustomEditor";
import CustomSelectBtn from "../CustomSelectBtn";
import CustomBtn from "../CustomBtn";
import { useState } from "react";
import { useEffect } from "react";

//we'll use BlogPostForm for either creating new BlogPost or updating the existing blogPost(which is why we are giving argument ie "existingPost")

const BlogPostForm = ({ existingPost }) => {

    const navigate = useNavigate();
    const currentUserData = useSelector((state) => state.auth.userData);
    const [currentPost, setCurrentPost] = useState({});
    useEffect(() => {
        console.log(existingPost)
        setCurrentPost(existingPost)
        console.log("curentPost", currentPost);
    }, [existingPost])


    const { register, handleSubmit, control, getValues } = useForm({
        defaultValues: {
            title: currentPost?.title || "",
            content: existingPost?.content || "",
            status: existingPost?.status || "active "
        }
    });

    const submitHandler = async (data) => {
        if (existingPost) {
            //updating new image file in storage bucket 
            // const updatingImageFile = data.image[0] ? await appwriteDbService.uploadFile(data.image[0]) : null;

            //deleting old image file from storage bucket
            // if (updatingImageFile) {
            //     await appwriteDbService.deleteFile(existingPost.featuredImage);
            // }

            //updating existing post with the new data in db
            // const updatingDbExistingPost = await appwriteDbService.updatePost(existingPost.$id, { ...data, featuredImage: updatingImageFile ? updatingImageFile.$id : existingPost.featuredImage })

            // if (updatingDbExistingPost) {
            //     navigate(`/post/${updatingDbExistingPost.$id}`)
            // }
        } else {

            //creating new image file in storage bucket
            const creatingImageFile = data.image[0] ? await appwriteDbService.uploadFile(data.image[0]) : null;

            //creating new post in db
            if (creatingImageFile) {
                console.log("uploaded Image details", creatingImageFile)
                const fileId = creatingImageFile.$id;
                data.featuredImage = fileId;
                console.log("fileId details", fileId);
                console.log("data argument details", data);
                console.log("currentUserdata", currentUserData);

                const creatingDbNewPost = await appwriteDbService.createPost({
                    title: data.title,
                    content: data.content,
                    featuredImage: fileId,
                    status: data.status,
                    userId: currentUserData.$id,
                })

                if (creatingDbNewPost) {
                    console.log("new post data", creatingDbNewPost)
                    navigate(`/post/${creatingDbNewPost.$id}`)
                }
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)} className="flex flex-wrap">
            <div className="w-2/3 px-2">

                <CustomInput
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />

                <CustomEditor
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>

            <div className="w-1/3 px-2">
                <CustomInput
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !existingPost })}
                />

                {
                    existingPost && (
                        <div className="w-full mb-4">
                            <img
                                className="rounded-lg"
                                src={appwriteDbService.getFilePreview(currentPost.featuredImage)}
                                alt={existingPost.title} />
                        </div>
                    )
                }

                <CustomSelectBtn
                    options={["active", "inactive"]}
                    label="Status "
                    className="mb-4"
                    {...register("status", { required: true })}
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white"
                >
                    {existingPost ? "Update" : "Submit"}
                </button>

                {/* <CustomBtn
                    type="submit"
                    classname="w-full"
                    bgColor={existingPost ? "bg-green-500" : "bg-blue-600"}
                    text={existingPost ? "Update" : "Submit"}
                /> */}
            </div>
        </form>
    )
}

export default BlogPostForm
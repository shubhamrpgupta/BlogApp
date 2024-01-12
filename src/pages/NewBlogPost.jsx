import React from 'react'
import Container from "../component/container/Container"
import BlogPostForm from "../component/blogpost_form/BlogPostForm"

const NewBlogPost = () => {
    return (
        <div className="py-8">
            <Container>
                <BlogPostForm />
            </Container>
        </div>
    )
}

export default NewBlogPost
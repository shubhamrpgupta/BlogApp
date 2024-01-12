import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AuthLayout from "./component/AuthLayout.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AllBlogPost from "./pages/AllBlogPost.jsx";
import SinglePost from "./pages/SinglePost.jsx";
import EditBlogPost from "./pages/EditBlogPost.jsx";
import NewBlogPost from "./pages/NewBlogPost.jsx";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App />} >

    <Route path="" element={<Home />} />
    <Route path="signup" element={
      (
        <AuthLayout authentication={false}>
          <Signup />
        </AuthLayout>
      )}
    />

    <Route path="login" element={
      (
        <AuthLayout authentication={false}>
          <Login />
        </AuthLayout>
      )}
    />

    <Route path="allPosts" element={
      (
        <AuthLayout authentication>
          <AllBlogPost />
        </AuthLayout>
      )}
    />

    <Route path="post/:uniqueId" element={
      (
        <AuthLayout authentication>
          <SinglePost />
        </AuthLayout>
      )}
    />

    <Route path="post/edit/:uniqueId" element={
      (
        <AuthLayout authentication>
          <EditBlogPost />
        </AuthLayout>
      )}
    />

    <Route path="newpost" element={
      (
        <AuthLayout authentication>
          <NewBlogPost />
        </AuthLayout>
      )}
    />
  </Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)

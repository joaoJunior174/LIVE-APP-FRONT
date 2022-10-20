import axios from "axios";
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';


export default function Signin() {
    const [post, setPost] = React.useState(null);
    const post_username = useRef(null);

    const post_password  = useRef(null);
    const router = useRouter()


    function createPost() {
      const postData = {
        username: post_username.current.value,
        password: post_password.current.value,
      };
      
      axios.post('http://localhost:4000/auth/login', postData)
      .then((response) => {
          toast.success("Account registration done!");
          router.push("chat");
        })
      .catch(function (error) {
          if (error.response) {
            toast.error("Error while creatin registration " + error.response.data?.message);
          } 
        })
    }

  return (
  <>
    <link href="//db.onlinewebfonts.com/c/a4e256ed67403c6ad5d43937ed48a77b?family=Core+Sans+N+W01+35+Light" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="form.css" type="text/css"/>
    <div className="body-content">
    <div className="module">
        <h1>Sign in</h1>
        <div className="alert alert-error"></div>
        <input type="text" placeholder="User Name" ref={post_username} required />
        <input type="password" placeholder="Password" ref={post_password} required />
        <input type="button" onClick={createPost} value="Register" class="btn btn-block btn-primary" />
    </div>
</div>
<ToastContainer />
</>
  )
}

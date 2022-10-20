import axios from "axios";
import React, { useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";

export default function Signup() {
  const [post, setPost] = React.useState(null);
  const post_name = useRef(null);
  const post_username = useRef(null);
  const post_nickname = useRef(null);
  const post_password  = useRef(null);
  const router = useRouter()
  const [route, setRoute] = useState()
  

      function createPost() {
        const postData = {
          name: post_name.current.value,
          username: post_username.current.value,
          nickname: post_nickname.current.value,
          password: post_password.current.value,
        };
        
        axios.post('http://localhost:4000/user', postData)
        .then((response) => {
            toast.success("Account registration done!");
            router.push("signin");
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
        <h1>Create an account</h1>
        <div className="alert alert-error"></div>
        <input type="text" placeholder="Name" ref={post_name} required />
        <input type="text" placeholder="User Name" ref={post_username} required />
        <input type="text" placeholder="Nick Name" ref={post_nickname} required />
        <input type="password" placeholder="Password" ref={post_password} required />
        <input type="button" value="Register" onClick={createPost} class="btn btn-block btn-primary" />
    </div>
</div>
<ToastContainer />
</>
  )
}

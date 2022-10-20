import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4000";


export default function Signin() {
    const [post, setPost] = React.useState(null);
    const router = useRouter()
    const post_username = useRef(null);
    const [response, setResponse] = useState("");
    let historyMsgs = "";

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("msgToClient", data => {
        historyMsgs +=data.message + '\n';
        setResponse(historyMsgs);
    });
    return () => socket.disconnect();
    }, []);

    function createPost() {
      const postData = post_username.current.value;
      const socket = socketIOClient(ENDPOINT);
      socket.emit("msgToServer", { message: postData });
    }

  return (
  <>
    <link href="//db.onlinewebfonts.com/c/a4e256ed67403c6ad5d43937ed48a77b?family=Core+Sans+N+W01+35+Light" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="form.css" type="text/css"/>
    <div className="body-content">
    <div className="module">
        <h1>chat</h1>
        <div className="alert alert-error"></div>
        <textarea className="campoChat" value={response}></textarea>
        <input type="text" placeholder="type your text here" ref={post_username} />
        <input type="button" onClick={createPost} value="Send" class="btn btn-block btn-primary" />
    </div>
</div> 
  </>
  )
}

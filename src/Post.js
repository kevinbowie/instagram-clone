import { Avatar } from "@material-ui/core";
import React from "react";
import "./Post.css";

function Post({ username, caption, imageUrl }) {
  return (
    <div className="post">
      <div className="post_header">
        <Avatar
          className="post_avatar"
          alt={username}
          src="/static/images/avatar1.jpg"
        />
        <h3>{username}</h3>
      </div>
      <img className="post_image" src={imageUrl} alt="" />

      <h4 className="post_text">
        <strong>{username}</strong> {caption}
      </h4>
    </div>
  );
}

export default Post;

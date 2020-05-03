/* eslint-disable linebreak-style */
import React, { useState } from "react";

const Blog = ({ blog, blogService }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const [alive, setAlive] = useState(true);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const clickHandler = () => {
    setVisible(!visible);
  };

  const likeHandler = async () => {
    const newObj = {
      user: blog.user.id,
      likes: likes + 1,
      title: blog.title,
      author: blog.author,
      url: blog.url,
    };
    await blogService.update(blog.id, newObj);
    setLikes(likes + 1);
  };

  const deleteHandler = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id);
      setAlive(false);
    }
  };
  if (!alive) {
    return null;
  }

  if (visible) {
    return (
      <div style={blogStyle}>
        <p>
          {blog.title} <button onClick={clickHandler}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>
          likes {likes} <button onClick={likeHandler}>like</button>
        </p>
        <p>{blog.author}</p>
        <button onClick={deleteHandler}>remove</button>
      </div>
    );
  } else {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={clickHandler}>view</button>
      </div>
    );
  }
};
export default Blog;

import React, { useState } from 'react';
import axios from "axios";
import { motion } from "framer-motion";
import { Pagination } from 'antd';
import "antd/dist/antd.css";

import "../assets/css/MainPage.css"
import avatar from '../assets/images/avatar.png'

const baseURL = "https://jsonplaceholder.typicode.com/posts";

const MainPage = () => {
    const [posts, setPosts] = useState([]);
    const [minPage, setMinPage] = useState(0);
    const [maxPage, setMaxPage] = useState(9);

    axios.get(baseURL).then((response) => {
        setPosts(response.data);
    });

    const displayPosts = (
        posts.map((post, idx) => (
            <motion.div 
                key={idx} 
                className="post-box"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <div className="header">
                    <img src={avatar}></img>
                    <h1 className="user-id">User id: {post.id}</h1>
                </div>
                
                <h4>{post.title}</h4>
                <p>{post.body}</p>
            </motion.div>
        ))
    )

    const handleChange = value => {
        if (value <= 1) {
            setMinPage(0);
            setMaxPage(9);
        }
        else {
            setMinPage(value*9-10);
            setMaxPage(value*9);
        }
        
    };

    return (
        <div className="app">
            <div className="container">

            <Pagination
                    defaultCurrent={1}
                    defaultPageSize={10} 
                    onChange={handleChange}
                    total={displayPosts.length} 
                    className="pagination"
            />

            {displayPosts && displayPosts.length>0 && displayPosts.slice(minPage,maxPage)}

            <motion.div 
                    className="post-box"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div className="header">
                        <img src={avatar}></img>
                        <h1 className="user-id">User id: 2</h1>
                    </div>
                    
                    <h4>sunt aut facere repellat provident occaecati excepturi optio reprehenderit</h4>
                    <p>quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto</p>
                
                </motion.div>
            </div>
        </div>
    );
};
 
 
export default MainPage;
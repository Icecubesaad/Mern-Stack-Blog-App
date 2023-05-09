import React, { useContext } from 'react';
import { useState } from 'react';
import AppContext from './Function/AppContext';
import { useEffect } from 'react';
import  {useNavigate} from 'react-router-dom';
const BlogsAdd = () => {
    const navigate = useNavigate();
    const context = useContext(AppContext)
    const {userinfo,getUser} = context
    useEffect(() => {
        if(window.localStorage.getItem("key")){
            getUser()
        }
        else{
            navigate("/signin")
        }
    }, []);
    const [Blogs, setBlogs] = useState({
        "title":"",
        "description":"",
        "cut":"",
        "field":""
    });
    const change = (e)=>{
        const key = e.target.name;
        const value = e.target.value;
        setBlogs({...Blogs,[key]:value})
    }
    const Post = async()=>{
        const {title,description,cut,field} = Blogs
        const tags = cut.split(",")
        const data = await fetch("/api/blogs/Post",{
            method:"POST",
            headers:{
                "jwt_token":localStorage.getItem('key'),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                title,description,tags,user:userinfo.UserName,field
            })
        })
        const parsed = await data.json()
        console.log(parsed)
    }
    return (
        <div className='containerl'>
            <div className='containerli'>
            <h1>Title</h1> <input name="title" onChange={change} value={Blogs.title} placeholder='Enter the title here'/>
            <h1>Tags</h1> <input name="cut" onChange={change} value={Blogs.tags} placeholder='Enter the tags here'/>
            <h1>Description</h1> <textarea id='desc' name="description" onChange={change} value={Blogs.description} placeholder='Enter the title here'/>
            <h1>Field</h1> <textarea id='desc' name="description" onChange={change} value={Blogs.field} placeholder='Enter the title here'/>
            </div>
            <button onClick={Post} className='btn btn-dark'>Submit</button>
        </div>
    );
}

export default BlogsAdd;

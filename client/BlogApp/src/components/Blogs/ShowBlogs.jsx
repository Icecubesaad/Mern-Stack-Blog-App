import React, { useContext } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import SidebarBlogs from "../SideComponent/SidebarBlogs";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Spinner from "../spinner/BigSpinner";
import AppContext from "../Function/AppContext";
const ShowBlogs = () => {
  const [image, setimage] = useState({Image:""});
  const [BlogsFiltered, setBlogsFiltered] = useState();
  const [loading, setloading] = useState(true);
  const [ShowBlogs, setShowBlogs] = useState("");
  const [changelike, setchangelike] = useState(true);
  const [likes, setlikes] = useState();
  const { id } = useParams();
  const Navigate = useNavigate()
  useEffect(() => {
    if(localStorage.getItem("key")){
      getUser();
      fetchBlog();
    }
    else{
      fetchBlog()
    }
  }, [id]);
  const fetchBlog = async () => {
    
    const data = await fetch(`/api/blogs/filter/${id}`, {
      method: "GET",
    });
    const parsed = await data.json();
    if(parsed){
      fetchImage()
      setloading(false)
    }
    setlikes(parsed.Likes);
    setShowBlogs(parsed);
    
  };
  const fetchImage = async()=>{
    const data = await fetch(`/api/blogs/filterImage/${id}`,{
      method:"GET",
    })
    const parsed = await data.json();
    setimage({"Image":parsed.Image})
  }
  const UpdateLike = async () => {
    if(localStorage.getItem("key")){
      setchangelike(false);
      setlikes((e) => e + 1);
      updateUser(changelike);
      const data = await fetch(`/api/blogs/updates/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          changelike: true,
        }),
      });
    }
    else{
      Navigate("/signin")
    }
  };
  
  const Dislike = async () => {
    if(localStorage.getItem("key")){
      setchangelike(true)
    updateUserDisLike()
    setlikes((e) => e - 1);
    const data = await fetch(`/api/blogs/updates/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        changelike: false,
      }),
    });
    }
    else{
      Navigate("/signin")
    }
    
  };
  const updateUser = async()=>{
    const User_side = await fetch(`/api/auth/likes/${id}`,{
      method:"POST",
      headers:{
        "jwt_token" : localStorage.getItem("key"),
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        option:true
      })
    })
}
const updateUserDisLike = async()=>{
  const User_side = await fetch(`/api/auth/likes/${id}`,{
    method:"POST",
    headers:{
      "jwt_token" : localStorage.getItem("key"),
      "Content-Type": "application/json"
    },
    body:JSON.stringify({
      option:false
    })
  })
}
const getUser = async()=>{
  const getting = await fetch("/api/auth/Get",{
      method:"GET",
      headers:{
          "jwt_token":localStorage.getItem("key")
      }
  }) 
  const parsed = await getting.json()
  if(parsed.Liked.includes(id)){
    setchangelike(false)
  }
  else{
    setchangelike(true)
  }
}
  return (
    <>
     {  loading ? <div style={{display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:"black",height:"100vh", width:"100%"}}><Spinner/></div> : <> <Header />
      <div
        className="container-Show"
        style={{ minHeight:"100vh" , display: "flex", flexDirection: "row", paddingTop: "50px", backgroundColor:"black", color:"#f8f8f8" }}
      >
        <div
          className="container-blogs"
          style={{ width: "70%", paddingLeft: "30px" }}
          >
         { image.Image === "" ? <div style={{height:"355px",width:"748px",backgroundColor:"grey",display:"flex",justifyContent:"center",alignItems:"center"}}><Spinner/></div> : <img src={image.Image} style={{ height: "355px", width: "748px" }}  /> }
          <div
            style={{
              display: "flex",
              width: "80%",
              marginTop: "20px",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              className="title-blogs"
              style={{
                fontSize: "2rem",
                fontFamily: "Heebo",
                fontWeight: "1000",
              }}
            >
              {ShowBlogs.Title}
            </div>
            <div
              style={{
                display: "flex",
                marginLeft: "70px",
                alignItems: "center",
              }}
            >
              {likes}
              <div>
                {changelike ? (
                  <button
                  style={{backgroundColor:"transparent",border:"transparent"}}
                    
                    onClick={UpdateLike}
                  >
                    <input type="checkbox" id="checkbox" />
                        <label for="checkbox">
                          <svg
                            id="heart-svg"
                            viewBox="467 392 58 57"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g
                              id="Group"
                              fill="none"
                              fill-rule="evenodd"
                              transform="translate(467 392)"
                            >
                              <path
                                d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
                                id="heart"
                                fill="#AAB8C2"
                              />
                              <circle
                                id="main-circ"
                                fill="#E2264D"
                                opacity="0"
                                cx="29.5"
                                cy="29.5"
                                r="1.5"
                              />

                              <g
                                id="grp7"
                                opacity="0"
                                transform="translate(7 6)"
                              >
                                <circle
                                  id="oval1"
                                  fill="#9CD8C3"
                                  cx="2"
                                  cy="6"
                                  r="2"
                                />
                                <circle
                                  id="oval2"
                                  fill="#8CE8C3"
                                  cx="5"
                                  cy="2"
                                  r="2"
                                />
                              </g>

                              <g
                                id="grp6"
                                opacity="0"
                                transform="translate(0 28)"
                              >
                                <circle
                                  id="oval1"
                                  fill="#CC8EF5"
                                  cx="2"
                                  cy="7"
                                  r="2"
                                />
                                <circle
                                  id="oval2"
                                  fill="#91D2FA"
                                  cx="3"
                                  cy="2"
                                  r="2"
                                />
                              </g>

                              <g
                                id="grp3"
                                opacity="0"
                                transform="translate(52 28)"
                              >
                                <circle
                                  id="oval2"
                                  fill="#9CD8C3"
                                  cx="2"
                                  cy="7"
                                  r="2"
                                />
                                <circle
                                  id="oval1"
                                  fill="#8CE8C3"
                                  cx="4"
                                  cy="2"
                                  r="2"
                                />
                              </g>

                              <g
                                id="grp2"
                                opacity="0"
                                transform="translate(44 6)"
                              >
                                <circle
                                  id="oval2"
                                  fill="#CC8EF5"
                                  cx="5"
                                  cy="6"
                                  r="2"
                                />
                                <circle
                                  id="oval1"
                                  fill="#CC8EF5"
                                  cx="2"
                                  cy="2"
                                  r="2"
                                />
                              </g>

                              <g
                                id="grp5"
                                opacity="0"
                                transform="translate(14 50)"
                              >
                                <circle
                                  id="oval1"
                                  fill="#91D2FA"
                                  cx="6"
                                  cy="5"
                                  r="2"
                                />
                                <circle
                                  id="oval2"
                                  fill="#91D2FA"
                                  cx="2"
                                  cy="2"
                                  r="2"
                                />
                              </g>

                              <g
                                id="grp4"
                                opacity="0"
                                transform="translate(35 50)"
                              >
                                <circle
                                  id="oval1"
                                  fill="#F48EA7"
                                  cx="6"
                                  cy="5"
                                  r="2"
                                />
                                <circle
                                  id="oval2"
                                  fill="#F48EA7"
                                  cx="2"
                                  cy="2"
                                  r="2"
                                />
                              </g>

                              <g
                                id="grp1"
                                opacity="0"
                                transform="translate(24)"
                              >
                                <circle
                                  id="oval1"
                                  fill="#9FC7FA"
                                  cx="2.5"
                                  cy="3"
                                  r="2"
                                />
                                <circle
                                  id="oval2"
                                  fill="#9FC7FA"
                                  cx="7.5"
                                  cy="2"
                                  r="2"
                                />
                              </g>
                            </g>
                          </svg>
                        </label>
                  </button>
                ) : (
                  <button onClick={Dislike} style={{backgroundColor:"transparent",border:"transparent", marginLeft:"15px"}}><div id="main-content">
                    <div>
                      <input type="checkbox" id="checkbox1" />
                      <label for="checkbox1">
                        <svg
                          id="heart-svg"
                          viewBox="467 392 58 57"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g
                            id="Group"
                            fill="red"
                            fill-rule="evenodd"
                            transform="translate(467 392)"
                          >
                            <path
                              d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
                              id="heart"
                              fill="red"
                            />
                            <circle
                              id="main-circ"
                              fill="#E2264D"
                              opacity="0"
                              cx="29.5"
                              cy="29.5"
                              r="1.5"
                            />

                            <g
                              id="grp7"
                              opacity="0"
                              transform="translate(7 6)"
                            >
                              <circle
                                id="oval1"
                                fill="#9CD8C3"
                                cx="2"
                                cy="6"
                                r="2"
                              />
                              <circle
                                id="oval2"
                                fill="#8CE8C3"
                                cx="5"
                                cy="2"
                                r="2"
                              />
                            </g>

                            <g
                              id="grp6"
                              opacity="0"
                              transform="translate(0 28)"
                            >
                              <circle
                                id="oval1"
                                fill="#CC8EF5"
                                cx="2"
                                cy="7"
                                r="2"
                              />
                              <circle
                                id="oval2"
                                fill="#91D2FA"
                                cx="3"
                                cy="2"
                                r="2"
                              />
                            </g>

                            <g
                              id="grp3"
                              opacity="0"
                              transform="translate(52 28)"
                            >
                              <circle
                                id="oval2"
                                fill="#9CD8C3"
                                cx="2"
                                cy="7"
                                r="2"
                              />
                              <circle
                                id="oval1"
                                fill="#8CE8C3"
                                cx="4"
                                cy="2"
                                r="2"
                              />
                            </g>

                            <g
                              id="grp2"
                              opacity="0"
                              transform="translate(44 6)"
                            >
                              <circle
                                id="oval2"
                                fill="#CC8EF5"
                                cx="5"
                                cy="6"
                                r="2"
                              />
                              <circle
                                id="oval1"
                                fill="#CC8EF5"
                                cx="2"
                                cy="2"
                                r="2"
                              />
                            </g>

                            <g
                              id="grp5"
                              opacity="0"
                              transform="translate(14 50)"
                            >
                              <circle
                                id="oval1"
                                fill="#91D2FA"
                                cx="6"
                                cy="5"
                                r="2"
                              />
                              <circle
                                id="oval2"
                                fill="#91D2FA"
                                cx="2"
                                cy="2"
                                r="2"
                              />
                            </g>

                            <g
                              id="grp4"
                              opacity="0"
                              transform="translate(35 50)"
                            >
                              <circle
                                id="oval1"
                                fill="#F48EA7"
                                cx="6"
                                cy="5"
                                r="2"
                              />
                              <circle
                                id="oval2"
                                fill="#F48EA7"
                                cx="2"
                                cy="2"
                                r="2"
                              />
                            </g>

                            <g
                              id="grp1"
                              opacity="0"
                              transform="translate(24)"
                            >
                              <circle
                                id="oval1"
                                fill="#9FC7FA"
                                cx="2.5"
                                cy="3"
                                r="2"
                              />
                              <circle
                                id="oval2"
                                fill="#9FC7FA"
                                cx="7.5"
                                cy="2"
                                r="2"
                              />
                            </g>
                          </g>
                        </svg>
                      </label>
                    </div>
                  </div></button>
                )}
              </div>
            </div>
          </div>
          <div
            className="desc-blogs my-2"
            style={{
              fontSize: "1.1rem",
              fontFamily: "poppins",
              whiteSpace: "pre-wrap",
              width: "777px",
            }}
          >
            {ShowBlogs.Description}
          </div>
        </div>
        <SidebarBlogs />
      </div>
      </>}
    </>
  );
};

export default ShowBlogs;

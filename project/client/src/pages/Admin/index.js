import React, { Children , useEffect } from 'react'
import {Layout, Menu, message, Tabs} from 'antd'
import MovieList from './MovieList'
import TheatresTable from './TheatresTable'
import MovieFrom from './MovieForm'
import {Link , useNavigate} from "react-router-dom";
import axios from "axios";
import {Header} from "antd/es/layout/layout";
import {HomeOutlined, LogoutOutlined, ProfileOutlined, UserOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";

function Admin() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    window.location.href = '/login';
  }

    const checkUser = async () => {
        const user = await axios.get("/api/users/get-current-user", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        console.log(""+user.data.data);
        try {
          if (!user) {
              navigate("/admin");
          }
          if (user.data.data.role === "partner") {
            navigate("/partner");
            message.error("You are not allowed to access this page");
          } else if (user.data.data.role === "user") {
              navigate("/");
              message.error("You are not allowed to access this page");
          } else {
              navigate("/admin");
        }
        }
        catch (error) {
          if (error.response && error.response.status === 401) {
              // Handle 401 error, e.g., redirect to login or show a message
              navigate("/login");
              message.error("Session expired. Please log in again to continue");
          } else {
              console.error("An error occurred ", error);
              // Handle other errors or general error message
          }
        }
    }


    const tabItems = [
        { 
            key : '1',
            label : 'Movies',
            children : <MovieList/>

        },

        {
           key : '2',
           label : 'Theatres',
           children : <TheatresTable/>
        }
    ]

      

  return (
    <div> 
      <Layout>
            <Header
                className="d-flex justify-content-between"
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    background: "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    padding: "0 20px"
                }}
            >
                <h3 className="demo-logo text-white m-0" style={{ color: "white", fontFamily: "'Poppins', sans-serif" }}>
                    Book My Show
                </h3>
                <button 
                    onClick={logout} 
                    style={{
                        color: "white",
                        background: "transparent",
                        border: "1px solid white",
                        borderRadius: "5px",
                        padding: "5px 15px",
                        cursor: "pointer",
                        transition: "background 0.3s, color 0.3s"
                    }}
                    onMouseOver={(e) => {
                        e.target.style.background = "white";
                        e.target.style.color = "#182848";
                    }}
                    onMouseOut={(e) => {
                        e.target.style.background = "transparent";
                        e.target.style.color = "white";
                    }}
                >
                    LogOut
                </button>
            </Header>
            {/*<div style={{ padding: 24, minHeight: 380, background: "#fff" }}>*/}
            {/*    /!*{children}*!/*/}
            {/*</div>*/}
        </Layout>
        <h1>Admin Page</h1>



        <Tabs items={tabItems}/>


    </div>
  )
}

export default Admin
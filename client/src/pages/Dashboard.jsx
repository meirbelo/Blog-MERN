import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";


function Dashboard({name}) {
  const [userData, setUserData] = useState("");
  const [error, setError] = useState("");
  const [login , setLogin]=useState("");
  const [email , setEmail]=useState("");
  const [isAdmin , setISAdmin]=useState(false);

  useEffect(() => {
    fetchUserDetails();
  }, []);
  const fetchUserDetails = async () => {
    try {
      // Retrieve token from localStorage or other secure storage
      const token = localStorage.getItem("token"); // Replace with actual token retrieval
      if (!token) {
        setError('User is not logged in');
        return;
      }

      // Make the API request with the token in the Authorization header
      const response = await axios.get(
        "http://localhost:4242/api/user/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("User details fetched successfully:", response.data.user);
        setUserData(response.data.user);
        let userInfo={
            isLoggedIn:true,
            userData:response.data.user
        }
        localStorage.setItem('userData',JSON.stringify(userInfo));
      } else {
        console.log(response.data.message || "Failed to fetch user details");
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      console.log(err.response?.data?.message || "An error occurred");
    }
  };
  return (
    <Layout login={userData.login}>
      <h2 style={{ textAlign: "center" }}>Welcome to the Blog !!!</h2>
      <div style={{textAlign:'center'}}>
         <h2> Name: {userData.login} <br/> Email: {userData.email} </h2>

      </div>
      
    </Layout>
  );
}

export default Dashboard;
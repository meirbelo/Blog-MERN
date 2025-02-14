import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../App.css";

const Header = ({login}) => {
  const location = useLocation(); // Récupérer la page actuelle
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const isLoggedIn  = window.localStorage.getItem('isLogged')
  const isAdmin = window.localStorage.getItem('x-user-admin')
  const token = window.localStorage.getItem('token')


  useEffect(() => {
    getData();
  }, [location]);

  const getData = () => {
    const token = localStorage.getItem("token");

    if (token) {
      // Simuler une récupération d'utilisateur
      const user = JSON.parse(localStorage.getItem("user")); // Stocke l'utilisateur dans le localStorage
      setUserData(user);
    } else {
      setUserData(null);
    }
  };

  const logout = () => {
    localStorage.clear();
    setUserData(null);
    navigate("/");
  };

  return (
    <header>
    <nav className="navbar">
      <div className="navbar-logo">
        <i className="fas fa-briefcase logo-icon"></i>
        <span className="logo-text">Blog</span>
      </div>
      <ul className="navbar-links">

      {isLoggedIn ? (
          <>
<li>
          <Link to="/dashboard" className={location.pathname === "/" ? "active" : ""}>
          Dashboard
          </Link>
        </li>
            <li>
              <i
                className="fas fa-sign-out-alt logo-icon"
                style={{ cursor: "pointer" }}
                onClick={logout}
              >Logout</i>
            </li>
            
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className={location.pathname === "/login" ? "active" : ""}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className={location.pathname === "/register" ? "active" : ""}>
                Sign Up
              </Link>
            </li>
          </>
        )}

        {/* Affichage conditionnel */}
        {/* {userData ? (
          <>
            <li className="navbar-profile">
              <Link
                to="/homeScreen"
                className={location.pathname === "/homeScreen" ? "active" : ""}
                style={{ display: "flex" }}
              >
                <span className="username">{userData.name}</span>
              </Link>
            </li>
            <li>
              <i
                className="fas fa-sign-out-alt logo-icon"
                style={{ cursor: "pointer" }}
                onClick={logout}
              ></i>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className={location.pathname === "/login" ? "active" : ""}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className={location.pathname === "/register" ? "active" : ""}>
                Sign Up
              </Link>
            </li>
          </>
        )} */}
      </ul>
    </nav>
    </header>
  );
};

export default Header;


        {/* <li>
          <Link to="/dashboard" className={location.pathname === "/" ? "active" : ""}>
          Dashboard
          </Link>
        </li>
        <li>
        <Link to={`/${login}`} className={location.pathname === "/" ? "active" : ""}>
          login
        </Link>
        </li>
        <li>
        <Link to="/blogs" className={location.pathname === "/" ? "active" : ""}>
          Acceder au blog
          </Link>
        </li> */}

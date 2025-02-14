import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import MockedAlertBanner from "./MockedAlertBanner";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [login, setLogin] = useState();   
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage("");
        axios.post('http://localhost:4242/account/login', {login, password},         {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(result => {
            if(result.status === 200) {
                const token = result.headers['authorization']?.split(' ')[1];
                const isLogged = result.headers['x-user-connected'];
                const isAdmin = result.headers['x-user-admin'];
                localStorage.setItem('token', token);
                localStorage.setItem('isLogged', isLogged);
                localStorage.setItem('isAdmin', isAdmin);
                if (token) {
                    // Stocke le token dans localStorage
                    localStorage.setItem('token', token);
                    toast.success("User connected successfully!"); 
                    // Attendre un peu avant la redirection
                    setTimeout(() => {
                      navigate("/dashboard"); // Redirection vers la page souhaitée
                    }, 2000); // 2 secondes pour laisser le toast visible
              
                } else {
                    setErrorMessage("No Token Received");
                }
            }
            else {
                setErrorMessage("Login failed");
            }
        })
        .catch(err =>  {
            if(err.response) {
                if(err.response.status === 400 || err.response.status === 401) {
                    setErrorMessage("Uh-oh! Votre email ou mot de passe est incorrect.");
                } else {
                    setErrorMessage("An unxepected error occured");}
            }
        });
    }

    return(
<div>
    <ToastContainer/>
        <div className="d-flex justify-content-center align-items-center text-center vh-100" style= {{backgroundImage : "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))"}}>
            <div className="bg-white p-3 rounded" style={{width : '40%'}}>
                <form onSubmit={handleSubmit}>
                <h2 className='mb-3 text-primary'>Login</h2>
                {errorMessage && (
  <div className="alert alert-danger" role="alert">
    {errorMessage}
  </div>
)}


                    <div className="mb-3 text-start">
                        <label htmlFor="exampleInputLogin1" className="form-label">
                            <strong >Login</strong>
                        </label>
                        <input 
                            type="text"
                            placeholder="Enter Login"
                            className="form-control w-full p-2 border rounded mb-3" 
                            id="exampleInputname" 
                            onChange={(event) => setLogin(event.target.value)}
                            required
                        /> 
                        {/* {errors.login && (
                            <div className="text-danger">{errors.login}</div>
                        )} */}
                    </div>
                    <div className="mb-3 text-start">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            <strong>Password</strong>
                        </label>
                        <input 
                            type="password" 
                            placeholder="Enter Password"
                            className="form-control" 
                            id="exampleInputPassword1" 
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                        {/* {errors.invalidCredentials} */}
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>

                <p className='container my-2'>Don&apos;t have an account</p>
                <Link to='/register' className="btn btn-secondary">Register</Link>
            </div>
        </div>
    </div>
    )
}
export default Login;
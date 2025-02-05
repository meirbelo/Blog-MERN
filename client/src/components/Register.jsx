import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [errors, setErrors] = useState({});
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:4242/account/register', { login, email, password, passwordConfirm })
            .then(result => {
                if (result.status === 200) {
                    navigate('/login');
                } else {
                    alert("Registration successful! Please login to proceed.");
                }
            })
            .catch(err => {
                if (err.response) {
                    // console.log(err.response.data);
                    setErrors(err.response.data.errors || {});
                }
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center text-center vh-100" 
             style={{ backgroundImage: "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))" }}>
            <div className="bg-white p-3 rounded" style={{ width: '40%' }}>
                <h2 className='mb-3 text-primary'>{Register}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 text-start">
                        <label htmlFor="exampleInputLogin" className="form-label"><strong>Login</strong></label>
                        <input 
                            type="text"
                            placeholder="Enter Login"
                            className="form-control" 
                            id="exampleInputLogin" 
                            value={login}
                            onChange={(event) => {
                                setLogin(event.target.value);
                                setErrors(prev => ({ ...prev, login: "" }));
                            }}
                            required
                        />
                        {(errors.login || errors.loginExists) && (
                            <div className="text-danger">{errors.login || errors.loginExists}</div>
                        )}
                    </div>

                    <div className="mb-3 text-start">
                        <label htmlFor="exampleInputEmail1" className="form-label"><strong>Email</strong></label>
                        <input 
                            type="email" 
                            placeholder="Enter Email"
                            className="form-control" 
                            id="exampleInputEmail1" 
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                                setErrors(prev => ({ ...prev, email: "" }));
                            }}
                            required
                        />
                         {(errors.email || errors.emailExists) && (
                            <div className="text-danger">{errors.email || errors.emailExists}</div>
                        )}
                    </div>

                    <div className="mb-3 text-start">
                        <label htmlFor="exampleInputPassword1" className="form-label"><strong>Password</strong></label>
                        <input 
                            type="password" 
                            placeholder="Enter Password"
                            className="form-control" 
                            id="password" 
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                                setErrors(prev => ({ ...prev, password: "" }));
                            }}
                            required
                        />
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                    </div>

                    <div className="mb-3 text-start">
                        <label htmlFor="passwordConfirm" className="form-label"><strong>Confirm Password</strong></label>
                        <input 
                            type="password" 
                            placeholder="Enter Confirm Password"
                            className="form-control" 
                            id="passwordConfirm" 
                            value={passwordConfirm}
                            onChange={(event) => {
                                setPasswordConfirm(event.target.value);
                                setErrors(prev => ({ ...prev, passwordConfirm: "" }));
                            }}
                            required
                        />
                        {errors.passwordConfirm && <div className="text-danger">{errors.passwordConfirm}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary">Register</button>
                </form>

                <p className='container my-2'>Already have an account?</p>
                <Link to='/login' className="btn btn-secondary">Login</Link>
            </div>
        </div>
    );
};

export default Register;

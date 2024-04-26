
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

function Login() {
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    function attemptLogin() {
        axios.post('https://medicalstore.mashupstack.com/api/login',{
            email:email,
            password:password
        }).then(response=>{
            setErrorMessage('')
            var user = {
                email:email,
                token:response.data.token
            }
            dispatch(setUser(user));
            navigate("/medicine/posts");
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(' '))
            }else if(error.response.data.message){
                setErrorMessage(error.response.data.message)
            }else{
                setErrorMessage('Failed to login user. Please contact admin')
            }
        })
    }
    return (
        <div>
            <Navbar/>
            <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="col-lg-6 col-md-8 col-sm-10">
                    <div className="card bg-light">
                        <div className="card-body">
                            <h1 className="card-title text-warning text-center">Login</h1>
                            {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : ''}
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="text" placeholder="enter registered email"
                                    className="form-control"
                                    value={email}
                                    onInput={(event) => setEmail(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input type="password" placeholder="enter registered password"
                                    className="form-control"
                                    value={password}
                                    onInput={(event) => setPassword(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-secondary btn-block" onClick={attemptLogin}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;


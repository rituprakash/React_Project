
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function Register() {
    var [name, setName] = useState('');
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [passwordConf, setPasswordConf] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    var navigate = useNavigate();

    function registerUser(){
        var user = {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConf
        }
        axios.post('https://medicalstore.mashupstack.com/api/register',user).then(response=>{
            setErrorMessage('');
            navigate('/login');
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(' '));
            }else{
                setErrorMessage('Failed to connect to api');
            }
        })
    }

    return (
        <div>
            <Navbar />
            <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="col-lg-6 col-md-8 col-sm-10">
                    <div className="card bg-light">
                        <div className="card-body">
                            <h1 className="card-title text-center text-warning">Sign Up</h1>
                            {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : ''}
                            <div className="form-group">
                                <label>Name:</label>
                                <input type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="text"
                                    className="form-control"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirm Password:</label>
                                <input type="password"
                                    className="form-control"
                                    value={passwordConf}
                                    onChange={(event) => setPasswordConf(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-secondary btn-block" onClick={registerUser}>Submit</button>
                                <div className="text-center text-muted mt-3">
                            <p>Already have an account? <a className="text-warning" href="/login">Login Here..</a></p>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;



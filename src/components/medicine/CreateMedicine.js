import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";


function CreateMedicine() {
    var user = useSelector(store=>store.auth.user);
    var token = user?.token
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiry_date, setExpiry_date] = useState('');
    var navigate = useNavigate()
    function addMedicine() {
        axios.post('https://medicalstore.mashupstack.com/api/medicine',{
            name: name,
            company: company,
           expiry_date : expiry_date
        },{
            headers:{'Authorization':"Bearer "+ token}}).then(response=>{
            navigate('/medicine/posts')
        })
    }
    return (<div>
        <Navbar></Navbar>
        <div className="container">
            <div className="row">
                <div className="col-8 offset-2 bg-light mt-5 pb-4">
                   
                    <h1 className="text-center text-dark">Add Medicine</h1>
                    <div className="form-group text-dark">
                       <br/> <label>Name:</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        value={name} 
                        onChange={(event)=>{setName(event.target.value)}}
                        />
                    </div>
                    <div className="form-group text-dark">
                        <label>Company:</label>
                        <textarea 
                        className="form-control" 
                        value={company} 
                        onChange={(event)=>{setCompany(event.target.value)}}
                        />
                    </div>
                    <div className="form-group text-dark">
                        <label>Expiry Date:</label>
                        <input 
                        type="date" 
                        className="form-control" 
                        value={expiry_date} 
                        onChange={(event)=>{setExpiry_date(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block text-white" style={{ backgroundColor: '#738FA7' }} onClick={addMedicine}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default checkAuth(CreateMedicine);
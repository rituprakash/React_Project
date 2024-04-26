
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";

function EditMedicine() {
    var user = useSelector(store=>store.auth.user);
    var token = user?.token;
    const {postId} = useParams();
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiry_date, setExpiry_date] = useState('');
    
    let navigate = useNavigate();
    useEffect(()=>{
        axios.get('https://medicalstore.mashupstack.com/api/medicine/'+postId ,{
            headers:{'Authorization':"Bearer "+ token}}).then(response=>{
            setName(response.data.name);
            setCompany(response.data.company);
            setExpiry_date(response.data.expiry_date);
            
        })
    },[postId,token]);
    
    function updateMedicine(){
        axios.post('https://medicalstore.mashupstack.com/api/medicine/'+postId,{
            name: name,
            company: company,
            expiry_date : expiry_date
        },{
            headers:{'Authorization':"Bearer "+ token}}).then(response=>{
            alert(response.data.message)
        })
        navigate('/medicine/posts');
    }

    return (
        <div>
            <Navbar/>
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1 className="text-center mt-3">Edit Medicine</h1>
                        <div className="card mt-5 bg-light">
                            <div className="card-body">
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={name} 
                                        onChange={(event)=>{setName(event.target.value)}}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Company:</label>
                                    <textarea 
                                        className="form-control" 
                                        value={company} 
                                        onChange={(event)=>{setCompany(event.target.value)}}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Expiry Date:</label>
                                    <input 
                                        type="date"
                                        className="form-control" 
                                        value={expiry_date} 
                                        onChange={(event)=>{setExpiry_date(event.target.value)}}
                                    />
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary btn-block" style={{ backgroundColor: '#738FA7' }} onClick={updateMedicine}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(EditMedicine);

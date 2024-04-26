
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";

function ViewMedicine() {
    const user = useSelector(store => store.auth.user);
    const token = user?.token;
    const { postId } = useParams();
    const [medicine, setMedicine] = useState({ name: '', company: '', expiry_date: '' });

    useEffect(() => {
        axios.get('https://medicalstore.mashupstack.com/api/medicine/' + postId, {
            headers: { 'Authorization': "Bearer " + token }
        }).then(response => {
            setMedicine(response.data);
        });
    }, [postId, token]);

    return (
        <div style={{ display: "grid", gridTemplateRows: "auto 1fr" }}>
            <Navbar />
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "calc(100vh - 56px)" }} >
                <div style={{ width: "500px" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h1 className="text-center mb-5">Medicine Details</h1>
                                <div className="card">
                                    <div className="card-header"><h4>Description</h4></div>
                                    <div className="card-body">
                                        <p><strong>Medicine Name:</strong> {medicine.name}</p>
                                        <p><strong>Company:</strong> {medicine.company}</p>
                                        <p><strong>Expiry Date:</strong> {medicine.expiry_date}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(ViewMedicine);



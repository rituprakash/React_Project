
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import DeleteMedicineItem from "./DeleteMedicineItem";
import { useSelector } from "react-redux";

function ListMedicine() {
  const [allMedicines, setAllMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value.trim().toLowerCase();
    setSearchTerm(searchTerm);

    const filteredItems = allMedicines.filter((item) =>
      item.name.toLowerCase().startsWith(searchTerm)
    );
    setFilteredMedicines(filteredItems);
  };

  const user = useSelector((store) => store.auth.user);
  const token = user?.token || "";

  const fetchMedicines = () => {
    axios
      .get("https://medicalstore.mashupstack.com/api/medicine", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setAllMedicines(response.data);
        setFilteredMedicines(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  useEffect(() => {
    if (!user || !user.token) {
      navigate("/");
      return;
    }
    fetchMedicines();
  }, [user, navigate, token]);

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <form className="text-center">
              <label>Search Medicine: &nbsp;</label>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchInputChange}
              />
            </form>
          </div>
        </div>
      </div>
      <div className="container" >
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="my-4">Medicine List</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-8 offset-2">
            <Link to="/medicine/posts/create" className="btn btn-success mb-2">
              Add Medicine
            </Link>
            {filteredMedicines.length === 0 ? (
              <p>No matching posts found.</p>
            ) : (
              <table className="table table-bordered" style={{ backgroundColor: '#738FA7' }}>
                <thead>
                  <tr>
                    <th className="text-center">Medicine Name</th>
                    <th className="text-center">Company</th>
                    <th className="text-center">Expiry Date</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMedicines.map((medicine) => (
                    <DeleteMedicineItem
                      key={medicine.id}
                      medicine={medicine}
                      refresh={fetchMedicines}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListMedicine;




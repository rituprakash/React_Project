

import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function DeleteMedicineItem(props) {
  const [showModal, setShowModal] = useState(false); 
  const user = useSelector((store) => store.auth.user);
  const token = user?.token;

  function deleteMedicine() {
    setShowModal(false); 
    axios
      .delete(
        `https://medicalstore.mashupstack.com/api/medicine/${props.medicine.id}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((response) => {
        alert(response.data.message);
        props.refresh();
      });
  }

  return (
    <tr>
      <td className="text-center">{props.medicine.name}</td>
      <td className="text-center">{props.medicine.company}</td>
      <td className="text-center">{props.medicine.expiry_date}</td>
      <td className="text-center">
        <Link to={`/medicine/posts/${props.medicine.id}/view`} className="btn btn-primary mr-2">
          View
        </Link>
        <Link to={`/medicine/posts/${props.medicine.id}/edit`} className="btn btn-success mr-2">
          Edit
        </Link>
        {/* Delete button triggers modal */}
        <button className="btn btn-danger" onClick={() => setShowModal(true)}>
          Delete
        </button>

        {/* Confirmation Modal */}
        {showModal && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 999 }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "#fff", padding: "20px", borderRadius: "5px" }}>
              <h2>Confirm Deletion</h2>
              <p>Are you sure you want to delete this medicine?</p>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {/* Buttons aligned to the right */}
                <button className="btn btn-danger mr-2" onClick={deleteMedicine}>Delete</button>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
}

export default DeleteMedicineItem;

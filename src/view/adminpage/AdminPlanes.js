import React from "react";
import "./AdminPlanes.css";
import AddPlanes from "../../components/adminpage/AddPlanes";
import PlanesBoard from "../../components/adminpage/PlanesBoard";

const AdminPlanes = () => {
  return (
    <div className="admin-planes">
      <AddPlanes />
      <PlanesBoard />
    </div>
  );
};

export default AdminPlanes;

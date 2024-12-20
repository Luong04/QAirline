import React, { useState, useEffect } from "react";
import "./AdminPlanes.css";
import AddPlanes from "../../components/adminpage/AddPlanes";
import PlanesBoard from "../../components/adminpage/PlanesBoard";
import axios from "axios";

const AdminPlanes = () => {
  const [planes, setPlanes] = useState([]);

  // Fetch planes data when component mounts
  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const token = localStorage.getItem("role");
        const res = await axios.get("http://localhost:8081/api/admin/getPlane", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.planes) {
          setPlanes(res.data.planes);
        }
      } catch (err) {
        console.error("Error fetching planes:", err);
      }
    };
    fetchPlanes();
  }, []);

  return (
    <div className="admin-planes">
      {/* Pass planes and setPlanes as props */}
      <AddPlanes setPlanes={setPlanes} />
      <PlanesBoard planes={planes} setPlanes={setPlanes} />
    </div>
  );
};

export default AdminPlanes;

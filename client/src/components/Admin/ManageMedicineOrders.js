import React, { useEffect, useState } from "react";
import API from "../../services/api";

const ManageMedicineOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/medicine/orders").then(res => setOrders(res.data));
  }, []);

  return (
    <>
      <h2 className="page-title">Medicine Orders</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Prescription</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.customer_name}</td>
              <td>{o.customer_phone}</td>
              <td>
                <a
                  href={`https://clinic-website-project-1.onrender.com/uploads/prescriptions/${o.prescription}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View
                </a>
              </td>
              <td>{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ManageMedicineOrders;

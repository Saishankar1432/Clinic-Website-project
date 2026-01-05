import React, { useEffect, useState } from "react";
import API from "../../services/api";

const ManageContact = () => {
  const [data, setData] = useState({
    address: "",
    phone: "",
    email: "",
    hours: "",
    emergency: ""
  });

  useEffect(() => {
    API.get("/contact").then(res => setData(res.data));
  }, []);

  const handleSave = async () => {
    await API.put("/contact", data);
    alert("Contact updated successfully");

    const res = await API.get("/contact");
    setData(res.data);
  };

  return (
    <>
      <h2 className="page-title">Edit Contact</h2>

      <form className="admin-form grid-form">
        <input placeholder="Address" value={data.address} onChange={e=>setData({...data,address:e.target.value})} />
        <input placeholder="Phone" value={data.phone} onChange={e=>setData({...data,phone:e.target.value})} />
        <input placeholder="Email" value={data.email} onChange={e=>setData({...data,email:e.target.value})} />
        <input placeholder="Hours" value={data.hours} onChange={e=>setData({...data,hours:e.target.value})} />
        <input placeholder="Emergency" value={data.emergency} onChange={e=>setData({...data,emergency:e.target.value})} />

        <button type="button" className="save-btn" onClick={handleSave}>
          Save
        </button>
      </form>
    </>
  );
};

export default ManageContact;

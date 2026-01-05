import React, { useEffect, useState } from "react";
import API from "../../services/api";

const ManageFooter = () => {
  const [f, setF] = useState({
    description:"",
    services:"",
    address:"",
    phone:"",
    email:"",
    copyright:""
  });

  useEffect(() => {
    API.get("/footer").then(res => setF(res.data));
  }, []);

  const handleSave = async () => {
    await API.put("/footer", f);
    alert("Footer updated successfully");

    const res = await API.get("/footer");
    setF(res.data);
  };

  return (
    <>
      <h2 className="page-title">Edit Footer</h2>

      <form className="admin-form grid-form">
        <textarea value={f.description} onChange={e=>setF({...f,description:e.target.value})}/>
        <textarea value={f.services} onChange={e=>setF({...f,services:e.target.value})}/>
        <input value={f.address} onChange={e=>setF({...f,address:e.target.value})}/>
        <input value={f.phone} onChange={e=>setF({...f,phone:e.target.value})}/>
        <input value={f.email} onChange={e=>setF({...f,email:e.target.value})}/>
        <input value={f.copyright} onChange={e=>setF({...f,copyright:e.target.value})}/>

        <button type="button" className="save-btn" onClick={handleSave}>
          Save
        </button>
      </form>
    </>
  );
};

export default ManageFooter;

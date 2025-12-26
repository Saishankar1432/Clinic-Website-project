import React,{useEffect,useState} from "react";
import API from "../../services/api";

const ManageFooter=()=>{
  const [f,setF]=useState({description:"",services:"",address:"",phone:"",email:"",copyright:""});

  useEffect(()=>{API.get("/footer").then(res=>setF(res.data))},[]);

  return (
    <>
      <h2 className="page-title">Edit Footer</h2>
      <form className="admin-form grid-form">
        <textarea placeholder="Description" value={f.description} onChange={e=>setF({...f,description:e.target.value})}/>
        <textarea placeholder="Services" value={f.services} onChange={e=>setF({...f,services:e.target.value})}/>
        <input placeholder="Address" value={f.address} onChange={e=>setF({...f,address:e.target.value})}/>
        <input placeholder="Phone" value={f.phone} onChange={e=>setF({...f,phone:e.target.value})}/>
        <input placeholder="Email" value={f.email} onChange={e=>setF({...f,email:e.target.value})}/>
        <input placeholder="Copyright" value={f.copyright} onChange={e=>setF({...f,copyright:e.target.value})}/>
        <button className="save-btn" onClick={()=>API.put("/footer",f)}>Save</button>
      </form>
    </>
  );
};

export default ManageFooter;

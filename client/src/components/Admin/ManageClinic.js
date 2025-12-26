import React,{useEffect,useState} from "react";
import API from "../../services/api";

const ManageClinic=()=>{
  const [clinic,setClinic]=useState({name:"",tagline:"",about:""});

  useEffect(()=>{
    API.get("/clinic").then(res=>setClinic(res.data));
  },[]);

  const save=e=>{
    e.preventDefault();
    API.put("/clinic",clinic).then(()=>alert("Clinic updated"));
  };

  return (
    <>
      <h2 className="page-title">Manage Clinic</h2>
      <form className="admin-form grid-form" onSubmit={save}>
        <input value={clinic.name} onChange={e=>setClinic({...clinic,name:e.target.value})} placeholder="Clinic Name"/>
        <input value={clinic.tagline} onChange={e=>setClinic({...clinic,tagline:e.target.value})} placeholder="Tagline"/>
        <textarea value={clinic.about} onChange={e=>setClinic({...clinic,about:e.target.value})} placeholder="About Clinic"/>
        <button className="save-btn">Save</button>
      </form>
    </>
  );
};

export default ManageClinic;

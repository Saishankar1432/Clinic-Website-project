import React,{useEffect,useState} from "react";
import API from "../../services/api";

const ManageContact=()=>{
  const [data,setData]=useState({title:"",content:""});
  useEffect(()=>{API.get("/pages/contact").then(res=>setData(res.data))},[]);

  return (
    <>
      <h2 className="page-title">Edit Contact</h2>
      <form className="admin-form grid-form">
        <input placeholder="Title" value={data.title} onChange={e=>setData({...data,title:e.target.value})}/>
        <textarea placeholder="Contact Details" value={data.content} onChange={e=>setData({...data,content:e.target.value})}/>
        <button className="save-btn" onClick={()=>API.put("/pages/contact",data)}>Save</button>
      </form>
    </>
  );
};

export default ManageContact;

import React,{useEffect,useState} from "react";
import API from "../../services/api";

const ManageAbout=()=>{
  const [data,setData]=useState({title:"",content:"",founder:"",qualification:"",bullets:""});

  useEffect(()=>{API.get("/pages/about").then(res=>setData(res.data))},[]);

  return (
    <>
      <h2 className="page-title">Edit About</h2>
      <form className="admin-form grid-form">
        <input placeholder="Title" value={data.title} onChange={e=>setData({...data,title:e.target.value})}/>
        <input placeholder="Founder" value={data.founder} onChange={e=>setData({...data,founder:e.target.value})}/>
        <input placeholder="Qualification" value={data.qualification} onChange={e=>setData({...data,qualification:e.target.value})}/>
        <textarea placeholder="Content" value={data.content} onChange={e=>setData({...data,content:e.target.value})}/>
        <textarea placeholder="Bullets | separated" value={data.bullets} onChange={e=>setData({...data,bullets:e.target.value})}/>
        <button className="save-btn" onClick={()=>API.put("/pages/about",data)}>Save</button>
      </form>
    </>
  );
};

export default ManageAbout;

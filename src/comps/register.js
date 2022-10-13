  import React, { useState } from 'react';
import './Login.css';

import { useNavigate } from 'react-router-dom';



export default function Register() {


  const obj=useNavigate();

  const [n,setname]=useState("");
  const [e,setmail]=useState("");
  const [p,setpass]=useState("");
  const [phno,setphno]=useState();
  const [addr,setaddr]=useState("");
  const [pin,setpin]=useState();

  const againlog= async()=> {

obj("/",{replace:true});


  }

  const handleSubmit = async()=> {

  const result= await fetch('http://localhost:8080/UserSignup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({n,e,p,phno,addr,pin}),
  });

  var resp= await result.json();

  if(resp.data){

    alert("Registration Success Login Now");

    obj('/',{replace:true});
  }
else{

alert("Something went wrong !!");

obj('/register',{replace:true});

}
  }


 
  



  return(

    <div className="logindiv2">
      <h1>Register</h1>
    
      <label>
        <p>UserName</p>
        <input type="text" value={n} onChange={e=>setname(e.target.value)}/>
      </label>
      <label>
        <p>E Mail</p>
        <input type="email" value={e} onChange={e=>setmail(e.target.value)}/>
      </label>

      <label>
        <p>Password</p>
        <input type="password" value={p} onChange={e=>setpass(e.target.value)}/>
      </label>
 

      <label>
        <p>Phone Number</p>
        <input type="number" value={phno} onChange={e=>setphno(e.target.value)}/>
      </label>


      <label>
        <p>Address</p>
        <input type="text" value={addr} onChange={e=>setaddr(e.target.value)}/>
      </label>
 

      <label>
        <p>Pincode</p>
        <input type="number" value={pin} onChange={e=>setpin(e.target.value)}/>
      </label>

      <div>
        <p></p>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
  
    </div>
  )
} 

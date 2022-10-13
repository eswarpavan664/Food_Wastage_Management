import React, { useState ,useEffect} from 'react';
import './Login.css';
import Dashboard from './dashboard';

import { useNavigate } from 'react-router-dom';
import { Ip } from './../constants/Ip';



export default function Login() {

 

    let navigate = useNavigate();

  const detectLogin= async ()=>{
    const token =   localStorage.getItem('token')
    
        if(token){
          navigate('/Dashboard');
        }
        else{
          setScreen(0);
        }
        
        
  }
  useEffect(()=>{
  
    detectLogin();
},[])



  const [email,setEmail] = useState('');
const [password,setPassword]=useState('')
const [Name,setname] =useState('');
const [PhoneNumber,setphno] =useState('');
const [addr,setaddr] =useState('');
const [pin,setpin] =useState('');

const login = async (props)=>{
fetch("http://localhost:8080/UserSignin",{
  method:"POST",
  headers: {
   'Content-Type': 'application/json'
 },
 body:JSON.stringify({
   "email":email,
   "password":password
 })
})
.then(res=>res.json())
.then(async (data)=>{
       try {
          localStorage.setItem('token',data.token)
          console.log(data.token)
          console.log(data.user);
          localStorage.setItem('name',data.user.Name);
          localStorage.setItem('email',data.user.email);
          localStorage.setItem('phno',data.user.PhoneNumber);
          localStorage.setItem('addr',data.user.Address);
          localStorage.setItem('pin',data.user.Pin);

          console.log("loged")
          if(data.token!=="Not Found"){
            navigate('/Dashboard');
          }
          else{
            alert("You Don't have an account")
          }
       } catch (e) {
         console.log("error hai",e)
          
       }
})
}


const signup = async (props)=>{
  fetch("http://localhost:8080/UserSignup",{
    method:"POST",
    headers: {
     'Content-Type': 'application/json'
   },
   body:JSON.stringify({
     "email":email,
     "Password":password,
     "Name":Name,
     "PhoneNumber":PhoneNumber,
     "Address":addr,
     "Pin":pin
   })
  })
  .then(res=>res.json())
  .then(async (data)=>{
         try {
            localStorage.setItem('token',data.token)
            console.log(data.token)

            console.log("loged")
            navigate('/Dashboard');
         } catch (e) {
           console.log("error hai",e)
            
         }
  })
  }
 
const [Screen,setScreen] = useState(0);
 
  



  return(

    <div className="logindiv2">
       {Screen===0?
                  <div>
                  <h1>Log In</h1>
                      
                      <label>
                        <p>E-Mail</p>
                        <input type="email" value={email} onChange={e=>setEmail(e.target.value)}/>
                      </label>
                      <label>
                        <p>Password</p>
                        <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                      </label>
                      <div>
                        <p></p>
                        <button type="submit" onClick={login}>Login</button>
                      </div>

                      <label>
                        <p>Don't have account ??</p>
                        <button type="submit" onClick={()=>setScreen(1)}>Register</button>
                      </label>
                  </div>
                  
                  :
                <div>
                      <div className="logindiv2">
  
                        <h1>Register</h1>
                        <label>
        <p>UserName</p>
        <input type="text" value={Name} onChange={e=>setname(e.target.value)}/>
      </label>
      <label>
        <p>E Mail</p>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)}/>
      </label>

      <label>
        <p>Password</p>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
      </label>
 

      <label>
        <p>Phone Number</p>
        <input type="number" value={PhoneNumber} onChange={e=>setphno(e.target.value)}/>
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
        <button type="submit" onClick={signup}>Submit</button>
      </div>
  
    </div>

         <br/>
                      <label>
                        <button type="submit" onClick={()=>setScreen(0)}>already have an account?</button>
                      </label>

                </div>


       }
        
  
    </div>
  )
} 

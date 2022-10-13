import React, { useState,useEffect} from "react";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import logo from '../4041.png';
import Login from "./Login";
import { useNavigate } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;



export default function Show(){

  var navigate=useNavigate();

  const token =   localStorage.getItem('token')



  const [pin,setpin]=useState("");
  const [Data,setData]=useState([])

useEffect(()=>{

get();

},[pin])



 
const get=()=>{


const res=fetch("http://localhost:8080/getposts",{
method:"POST",
headers: {
 'Content-Type': 'application/json'
},
body:JSON.stringify({
"Pin":pin
})


}).then(res=>res.json())
.then(async (data)=>{

setData(data)
console.log(data);


})

}


const  logout =()=>{
  localStorage.removeItem("token") 
   navigate('/',{replace:true})

  // return (<Login/>);
 
}


if(token){
return(
    

    <div>
    <Layout>
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      style={{height:"100vh"}}
    >
      <div>

        <img src={logo} className='logoo'></img>

      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['4']}
        items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
          (icon, index) => ({
            key: String(index + 1),
            icon: React.createElement(icon),
            label: `nav ${index + 1}`,
          }),
        )}
        style={{height:"100vh"}}
      />
    </Sider>
    <Layout>
      <Header
        className="site-layout-sub-header-background"
        style={{
          padding: 0,
        }}
      />
      <Content
        style={{
          margin: '24px 16px 0',
          height:"100vh",
          overflow:"scroll"
        }}
    
      >
        <div
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: 585,
          }}
        >
        All Food Details
        <p></p>
        
        
<div class="input-group-overlay d-none d-lg-flex mx-4">
      <input class="form-control appended-form-control" type="text" placeholder="Search through Pin code" value={pin} onChange={(e)=>setpin(e.target.value)}></input>
      <div class="input-group-append-overlay"><span class="input-group-text"><i class="fa fa-search"></i></span></div>
 </div>

          <>
          
          {Data.map((data)=>(
            <div class="wrapper">
            <div class="product-img">
              <img src={logo} height="350" width="350"></img>
            </div>
            <div class="product-info">
              <div class="product-text">
                <br></br>
                <h2><b>Name:</b>          {data.Name}</h2>
                <h2><b>PhoneNumber :</b>   {data.PhoneNumber}</h2>
                <h2><b>Food Name :</b>     {data.Fname}</h2>
                <h2><b>Quantity : </b>     {data.Quantity}</h2>
                <h2><b>Address : </b>      {data.City}</h2>
                <h2><b>Pincode : </b>      {data.Pin}</h2>
                <h2><b>Date Posted :</b>   {data.date.slice(0,10)}</h2>
              </div>
            </div>
        
            
          </div>
          
                   
          ))

          }
          </>
    
     


    </div>
        
        

        
      </Content>
      
    </Layout>
  </Layout>


  <button className='logout' onClick={logout}>Logout</button>
  
  </div>
    

)
  }
  else{

          alert('Please Login first..');
          //navigate('/',{replace:true});
        return (<Login/>);
         }

}
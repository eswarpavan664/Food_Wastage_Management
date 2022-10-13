import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import logo from '../4041.png'
import './Login.css';
const { Header, Content, Footer, Sider } = Layout;





export default function Post_food(){
  var navigate = useNavigate();
  const token =   localStorage.getItem('token')


const [name,setname]=useState('');
const [food,setfood]=useState('');
const [quantity,setquant]=useState('');
const [addr,setaddr]=useState('');
const [pin,setpin]=useState('');
const [phone,setphone]=useState('');

function notify(Pin){
console.log('in the notify',Pin);


  fetch('http://localhost:8080/getphs',{

  method:'POST',
  headers:{'Content-Type': 'application/json'},
  body:JSON.stringify({
    'Pin':Pin
  })

  }).then(res=>res.json())
  .then(result=>{

    console.log(result);
  console.log(result.x);

  })
 

}


  function post(){

   // const val = new Date().toISOString().split('T')[0]

   const val=new Date();

   fetch('http://localhost:8080/post-food',{

    method:'POST',
    headers:{'Content-Type': 'application/json'},
    body:JSON.stringify({

      "Name":name,
      "Fname":food,
      "Quantity":quantity,
      "City":addr,
      "Pin":pin,
      "PhoneNumber":phone,
      "date":val
    })


    }).then((response) => response.json())
    .then((result) => {
      

     
     if (result.status===0){
      alert("Something went wrong");
      
      //navigate('/Dashboard/post-food',{replace:true});
      
    }
    else{
      alert("success");
    
      notify(pin);

      alert('successfully notified to all ');
      navigate('/dashboard',{replace:true});

    }


  });

    
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
        }}
      >
        <div
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: 585,
          }}
        >
          content
        </div>

      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
          
      </Footer>
    </Layout>
  </Layout>


<form className='post-food' >

<h1>Post Food</h1>
<br/>
<label>Enter Your Name</label>
<br/>
<input type="text" onChange={e=>setname(e.target.value)}></input>
<br/>
<label>Enter Food Name</label>
<br/>
<input type="text" onChange={e=>setfood(e.target.value)}></input>
<br/>
<label>Enter Quantity</label>
<br/>
<input type="number" onChange={e=>setquant(e.target.value)}></input>
<br/>
<label>Enter City</label>
<br/>
<input type="text" onChange={e=>setaddr(e.target.value)}></input>
<br/>
<label>Enter Pincode</label>
<br/>
<input type="number" onChange={e=>setpin(e.target.value)}></input>
<br/>
<label>Enter Phone Number</label>
<br/>
<input type="number" onChange={e=>setphone(e.target.value)}></input>
<br/>
<br/>


</form>

<button type='submit' id='btn' onClick={post}>Post</button>

  <div className='logout'>
    <button onClick={logout}>Logout</button></div>
   </div>




    )
 }
 else{

  alert('Please Login first..');
  navigate('/',{replace:true});
//return (<Login/>);
 }
}
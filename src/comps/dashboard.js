import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import logo from '../4041.png'
import './Login.css';
import Login from './Login';
const { Header, Content, Footer, Sider } = Layout;

export default function Dashboard(){
  let navigate = useNavigate();
  const token =   localStorage.getItem('token')
  const  logout =()=>{
    localStorage.removeItem("token") 
     navigate('/',{replace:true})
   
 }

 const detailsmaxpro=()=>{

navigate('/Dashboard/available',{replace:true});

 }
const profile=()=>{

navigate('/Dashboard/user_profile',{replace:true});

}

const details=()=>{

navigate('/Dashboard/show_food',{replace:true});

}
 const post=()=>{

navigate('/Dashboard/post-food',{replace:true});


 }
 if(token){

    return(
      <div>
    <Layout>
    <Sider>
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
            label: `nav ${index}`,
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
          margin: '20px 20px 0px',
        }}
      >
        <div
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: 662,
          }}
        >
          
          Home
        </div>
      </Content>
      
    </Layout>
  </Layout>
  
  <div >
    <button className='postt-dem-btn' onClick={post}>Post Food</button>
    <button className='available-dem-btn' onClick={detailsmaxpro}>Show available food</button>
    <button className='det-dem-btn' onClick={details}>Show food</button>
    <button className='user-dem-btn' onClick={profile}>user</button>
    <button className='logout' onClick={logout}>Logout</button></div>
   </div>
    )
 }
 else{

  alert('Please Login first..');
  //navigate('/',{replace:true});
return (<Login/>);
 }
}
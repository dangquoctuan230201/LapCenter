import React,{useState} from "react";

import { Input, Button, Icon,Dimmer,Loader } from 'semantic-ui-react';
import './login.scss';
import {useHistory}from 'react-router-dom';
import Register from "../register/register";
const axios = require("axios");

const accont = {
    username:'admin',
    password:'admin'
}
const Login =() =>{
    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');
    const [loading, setLoading] = useState(false);
    

    const history = useHistory('');

    const handleChange = (e, field) => {
        if(field === 'username'){
            setUsername(e.target.value)
        }
        if(field === 'password'){
            setPassword(e.target.value)
        }
    }
    axios.post('/user', {
      firstName: 'Fred',
      lastName: 'Flintstone'
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    const onLogin = () => {
     
        console.log(username, password);
        if(username === accont.username  && password === accont.password){
          setLoading(true);
          axios.post('https://lap-center.herokuapp.com/api/login', {
            username: username,
            password: password
          })
          .then(function (response) {
            setLoading(false);
            console.log(response);
            history.push('/');
            
          })
          .catch(function (error) {
            setLoading(false);
            console.log(error);
            alert('may nhap sai username or password roi!')
            
          });
        }else{
            console.log('dang nhap that bai')
            alert('may nhap sai username or password roi!')
        }
        
    }
    let checkInfo = true;
      if (!username ||password ) checkInfo = true ; 
      else checkInfo = false;

    return (
        <div>
          <Dimmer active={loading} inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
        <Icon
        className='icon-home' name="home" size="large" inverted circular link
        onClick={() => history.push("/")}
      />
        
        <div className="login-container">
          <div className="login-form">
            <h1 style={{ textAlign: "center", marginBottom: "40px" }}> Đăng nhập </h1>
            <div className="login-content">
              <label>Tên đăng nhập</label>
              <br />
              <Input 
              placeholder="Username" 
              className="inputText" 
              value={username} 
              onChange={(e) => handleChange(e, 'username')} />
              <br />
              <label style={{ marginTop: "10px" }}>Mật khẩu</label>
              <br />
              <Input placeholder="Password" type="password" value={password} className="inputText" onChange={(e) => handleChange(e, 'password')} />
            <br />
            <Button primary onClick={onLogin} > Đăng nhập </Button>
            <p style={{ marginTop: "20px", textAlign: "center" }}>
              Bạn chưa có tài khoản?{" "}
              <a className="register-text" href="/register">
                Đăng ký ngay.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    );
  }
  
  export default Login;
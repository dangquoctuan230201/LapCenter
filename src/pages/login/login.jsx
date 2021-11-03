import React, { useState } from "react";
import { Input, Button, Dimmer, Loader, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./login.scss";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onChangeUsername = (value) => {
    setUsername(value);
  };

  const onChangePassword = (value) => {
    setPassword(value);
  };

  let checkInfo = true;
  if (!username || !password) checkInfo = true;
  if (username && password) checkInfo = false;

  const onLogin = () => {
    setLoading(true);
    axios
      .post("https://lap-center.herokuapp.com/api/login", {
        username: username,
        password: password,
      })
      .then(function (response) {
        console.log(response.data.token);
        setLoading(false);
        
        history.push("/");
        localStorage.setItem('customerName', response.data.userName);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('isAdmin', response.data.isAdmin);


      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        alert("Đăng nhập không thành công!");
      });
  };

  const onRegister = () => {
    history.push("/register");
  };

  return (
    <div>
      <Icon
        className='icon-home' name="home" size="large" inverted circular link
        onClick={() => history.push("/")}
      />
      <Dimmer active={loading} inverted>
        <Loader size="medium">Loading</Loader>
      </Dimmer>
      <div className="login-container">
        <div className="login-form">
          <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
            Đăng nhập
          </h1>
          <div className="login-content">
            <label>Email hoặc Số điện thoại</label>
            <br />
            <Input
              placeholder="Email hoặc Số điện thoại"
              onChange={(e) => {
                onChangeUsername(e.target.value);
              }}
              className="inputText"
            />
            <br />
            <label style={{ marginTop: "10px" }}>Mật khẩu</label>
            <br />
            <Input
              placeholder="Mật khẩu"
              type="password"
              onChange={(e) => {
                onChangePassword(e.target.value);
              }}
              className="inputText"
            />
            <br />
            <Button color="blue" disabled={checkInfo} onClick={onLogin}>
              Đăng nhập
            </Button>
            <p style={{ marginTop: "10px", textAlign: "center" }}>
              Bạn chưa có tài khoản?{" "}
              <a className="register-text" onClick={onRegister}>
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
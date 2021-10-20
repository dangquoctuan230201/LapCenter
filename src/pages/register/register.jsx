import React, { useState } from "react";

import { Input, Button, Icon, Dimmer,Loader,Modal } from "semantic-ui-react";
import "./register.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";

const accont = {
  username: "admin",
  password: "admin",
};
const Register = () => {
  const [name, setUsername] = useState("");
  const [phone, setPhone] = useState();
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [cfpassword, setcfPassword] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [message,setMessage] = useState("")
  const [loading, setLoading] = useState(false);

  const history = useHistory("");

  const handleChange = (e, field) => {
    if (field === "name") {
      setUsername(e.target.value);
    }
    if (field === "phone") {
      setPhone(e.target.value);
    }
    if (field === "email") {
      setMail(e.target.value);
    }
    if (field === "password") {
      setPassword(e.target.value);
    }
    if (field === "cfpassword") {
      setcfPassword(e.target.value);
    }
  };

  const onRegister = () => {
    if (password === cfpassword) {
      setLoading(true)
      axios.post('https://lap-center.herokuapp.com/api/register', {
        name: name,
        email: email,
        phone: phone,
        password: password
      })
      .then(function (res) {
        setLoading(false);
        setOpenDialog(true);
        setMessage('Đăng ký thành công!!!');
      })
      .catch(function (err) {
        setLoading(false);
        setOpenDialog(true);
        setMessage('Đăng ký tài khoản không thành công. Vui lòng thử lại sau!!!');
      });
    } else {
      setOpenDialog(true);
      setMessage('Mật khẩu không trùng khớp. Vui lòng thử lại!!!');
    }
  };
  let checkInfo = true;
  if (!name || !phone || !email || password || !cfpassword) checkInfo = true;
  else checkInfo = false;

  return (
    <div>
      <Dimmer active={loading} inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
      <Icon
        className="icon-home"
        name="home"
        size="large"
        inverted
        circular
        link
        onClick={() => history.push("/")}
      />
      <div className="register-container">
        <div className="register-form">
          <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
            {" "}
            Đăng kí{" "}
          </h1>
          <div className="register-content">
            <label>Tên đăng nhập</label>
            <br />
            <Input
              placeholder="Name"
              className="inputText"
              value={name}
              onChange={(e) => handleChange(e, "name")}
            />
            <br />
            <label>Điện Thoại</label>
            <br />
            <Input
              placeholder="Phone"
              className="inputText"
              type="number"
              value={phone}
              onChange={(e) => handleChange(e, "phone")}
            />
            <br />
            <label>Email</label>
            <br />
            <Input
              placeholder="Mail"
              className="inputText"
              value={email}
              onChange={(e) => handleChange(e, "email")}
            />
            <br />
            <label style={{ marginTop: "10px" }}>Mật khẩu</label>
            <br />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              className="inputText"
              onChange={(e) => handleChange(e, "password")}
            />
            <br />

            <label style={{ marginTop: "10px" }}>Nhập lại Mật khẩu</label>
            <br />
            <Input
              placeholder="Password"
              type="password"
              value={cfpassword}
              className="inputText"
              onChange={(e) => handleChange(e, "cfpassword")}
            />
            <br />
            <Button primary onClick={onRegister}>
              {" "}
              Đăng Kí{" "}
            </Button>
            <p style={{ marginTop: "10px", textAlign: "center" }}>
              Bạn đã có tài khoản.{" "}
              <a className="login-text" onClick={() => history.push("/login")}>
                Đăng nhập.
              </a>
            </p>
          </div>
        </div>
      </div>
      <Modal
        onClose={() => setOpenDialog(false)}
        onOpen={() => setOpenDialog(true)}
        open={openDialog}
        size="mini"
      >
        <Modal.Header>
          <h4 className="txt-check">Thông báo</h4>
        </Modal.Header>
        <Modal.Content image>
          <p>{message}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpenDialog(false)}>Đóng</Button>
          <Button positive onClick={() => (history.push("/login"), setOpenDialog(false))}>
            Đăng nhập
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default Register;

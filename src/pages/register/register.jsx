import React, { useState } from "react";
import { Input, Button, Modal, Loader, Dimmer, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import "./register.scss";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();

  const onChangeText = (field, value) => {
    switch (field) {
      case "name": {
        setName(value);
        break;
      }
      case "email": {
        setEmail(value);
        break;
      }
      case "phone": {
        setPhone(value);
        break;
      }
      case "password": {
        setPassword(value);
        break;
      }
      case "confirm": {
        setConfirmPassword(value);
        break;
      }
    }
  };

  let checkInfo = true;
  if (!name || !email || !phone || !password || !confirmPassword)
    checkInfo = true;
  if (name && email && phone && password && confirmPassword) checkInfo = false;

  const onRegister = () => {
    if (password === confirmPassword) {
      setLoading(true);
      axios
        .post("https://lap-center.herokuapp.com/api/register", {
          name: name,
          email: email,
          phone: phone,
          password: password,
        })
        .then(function (response) {
          console.log(response);
          setOpen(true);
          setMessage("Đăng ký thành công!");
          setLoading(false);
          setSuccess(true);
        })
        .catch(function (error) {
          console.log(error);
          setOpen(true);
          setMessage("Đặt ký không thành công!");
          setLoading(false);
          setSuccess(false);
        });
    }
    if (password !== confirmPassword) {
      alert("Mật khẩu không trùng khớp!");
    }
  };

  const onLogin = () => {
    setOpen(false);
    history.push("/login");
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
      <div className="register-container">
        <div className="register-form">
          <h1 style={{ textAlign: "center", marginBottom: "40px" }}>Đăng ký</h1>
          <div className="register-content">
            <label>Tên người dùng</label>
            <br />
            <Input
              placeholder="Tên người dùng"
              onChange={(e) => {
                onChangeText("name", e.target.value);
              }}
              className="inputText"
            />
            <br />
            <label>Số điện thoại</label>
            <br />
            <Input
              placeholder="Số điện thoại"
              onChange={(e) => {
                onChangeText("phone", e.target.value);
              }}
              className="inputText"
            />
            <br />
            <label>Email</label>
            <br />
            <Input
              placeholder="Email"
              onChange={(e) => {
                onChangeText("email", e.target.value);
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
                onChangeText("password", e.target.value);
              }}
              className="inputText"
            />
            <br />
            <label style={{ marginTop: "10px" }}>Xác nhận mật khẩu</label>
            <br />
            <Input
              placeholder="Xác nhận mật khẩu"
              type="password"
              onChange={(e) => {
                onChangeText("confirm", e.target.value);
              }}
              className="inputText"
            />
            <br />
            <Button color="blue" disabled={checkInfo} onClick={onRegister}>
              Đăng ký
            </Button>
            <p style={{ marginTop: "10px", textAlign: "center" }}>
              Bạn đã có tài khoản.{" "}
              <a className="login-text" onClick={onLogin}>
                Đăng nhập.
              </a>
            </p>
          </div>
        </div>
      </div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="mini"
      >
        <Modal.Header>
          <h4 className="txt-check">Thông báo</h4>
        </Modal.Header>
        <Modal.Content image>
          <p>{message}</p>
        </Modal.Content>
        <Modal.Actions>
          {success ? (
            <Button onClick={() => onLogin()} positive>
              Đăng nhập
            </Button>
          ) : (
            <Button onClick={() => setOpen(false)}>Đóng</Button>
          )}
        </Modal.Actions>
      </Modal>
    </div>
  );
}
export default Register;
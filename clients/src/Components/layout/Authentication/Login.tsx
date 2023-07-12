import React, { useState } from "react";
import "../../css/Register.css";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { notification } from "antd";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
const Register = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const userLogin = {
      phoneNumber,
      password,
    };
    const response = await axios.post(
      "http://localhost:8000/api/v1/users/login",
      userLogin
    );
    console.log(response);
    if (response.data.status === 400) {
      notification.error({
        message: "Tài khoản đã bị khóa",
      });
      return;
    }
    if (response.data.status === 200) {
      localStorage.setItem("flaguser", JSON.stringify(response.data.user[0]));
      const flaguserJSON = localStorage.getItem("flaguser");
      const flaguser = flaguserJSON ? JSON.parse(flaguserJSON) : null;
      if (flaguser?.roles === 0) {
        notification.success({
          message: "Đăng nhập thành công",
        });
        setTimeout(() => {
          navigate(`/information/account/${flaguser?.user_id}`);
        }, 1);
      } else {
        notification.success({
          message: "Xin chào Administrator",
        });
        setTimeout(() => {
          navigate("/admin/allProducts");
        }, 1);
      }
    } else if (response.data.status === 401) {
      notification.error({
        message: "Sai số điện thoại hoặc mật khẩu",
      });
    }
  };
  return (
    <>
      <Header />
      <section className="wrapper">
        <div className="img-icon">
          <img
            className="site-icon "
            src="https://cdn.tgdd.vn/2022/10/banner/TGDD-540x270.png"
            alt="Site Icon"
          />
        </div>
        <div className="step1">
          <h3>ĐĂNG NHẬP</h3>
          <form id="frmGetVerifyCode" onSubmit={handleLogin}>
            <div className="input-area">
              <PhoneIphoneIcon
                style={{ position: "relative", top: "45px", left: "20px" }}
              />
              <input
                type="tel"
                name="txtPhoneNumber"
                id="txtPhoneNumber"
                placeholder="Nhập số điện thoại"
                autoComplete="off"
                maxLength={10}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <LockOpenIcon
                style={{ position: "relative", top: "45px", left: "20px" }}
              />
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <label className="hide" />
            <button type="submit" className="btn-continue">
              TIẾP TỤC
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;

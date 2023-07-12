import axios from "axios";
import "../../css/Information.css";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { notification } from "antd";
import Header from "../Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Footer/Footer";

const ProfileUser = () => {
  const flaguserJSON = localStorage.getItem("flaguser");
  const flaguser = flaguserJSON ? JSON.parse(flaguserJSON) : null;
  const [name, setName] = useState<string | undefined>("");
  const [address, setAddress] = useState<string | undefined>("");
  const [gender, setGender] = useState<number | string | undefined>("");
  const [birthday, setBirthday] = useState<string | undefined>("");
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (id != flaguser?.user_id) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  interface UserInfo {
    user_id: number;
    phoneNumber: string;
    password: string;
    user_name: string;
    address: string;
    gender: string;
    date_of_birth: string;
  }

  const [user, setUser] = useState<UserInfo | null>(null);
  const loadUser = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/users/${flaguser.user_id}`
    );
    setUser(response.data.user[0]);
    setName(response.data.user[0]?.user_name);
    setAddress(response.data.user[0]?.address);
    setGender(response.data.user[0]?.gender);
    setBirthday(response.data.user[0]?.date_of_birth);
  };
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatedUser = {
    user_name: name,
    address,
    gender,
    date_of_birth: birthday,
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/users/${flaguser.user_id}`,
        updatedUser
      );
      if (response.status === 200) {
        notification.success({
          message: "Cập nhật thông tin thành công",
        });
      }
      const updatedFlagUser = { ...flaguser, ...updatedUser };
      localStorage.setItem("flaguser", JSON.stringify(updatedFlagUser));
      loadUser();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Header />
      <div className="container_profile">
        <Sidebar />
        <div className="profile_right">
          <div className="manager">
            <h2>Hồ Sơ Của Tôi</h2>
            <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            <hr />
          </div>
          <div className="main_profile">
            <div className="main_left">
              <table>
                <tbody>
                  <tr>
                    <td className="label">Số điện thoại</td>
                    <td className="label1">
                      <b>{user?.phoneNumber}</b>
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Tên</td>
                    <td className="label1">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Địa chỉ</td>
                    <td className="label1">
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Giới tính</td>
                    <td className="label1">
                      <div className="radio">
                        <input
                          type="radio"
                          name="gender"
                          value="0"
                          defaultChecked={gender === "0"}
                          onChange={(e) => setGender(e.target.value)}
                        />
                        <label
                          htmlFor="Nam"
                          style={{ display: "block", marginRight: "30px" }}
                        >
                          Nam
                        </label>
                        <input
                          type="radio"
                          name="gender"
                          value="1"
                          defaultChecked={gender === "1"}
                          onChange={(e) => setGender(e.target.value)}
                        />
                        <label
                          htmlFor="Nữ"
                          style={{ display: "block", marginRight: "30px" }}
                        >
                          Nữ
                        </label>
                        <input
                          type="radio"
                          name="gender"
                          value="2"
                          defaultChecked={gender === "2"}
                          onChange={(e) => setGender(e.target.value)}
                        />
                        <label
                          htmlFor="Khác"
                          style={{ display: "block", marginRight: "30px" }}
                        >
                          Khác
                        </label>
                        <label
                          style={{ display: "block", marginRight: "30px" }}
                        >
                          {user?.gender.toString() === "0" ? (
                            <b>Nam</b>
                          ) : user?.gender.toString() === "1" ? (
                            <b>Nữ</b>
                          ) : (
                            <b>Khác</b>
                          )}
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Ngày sinh</td>
                    <td className="label1">
                      <input
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className="btn-save" onClick={() => handleSave()}>
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileUser;

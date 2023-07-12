import "../../css/AddProducts.css";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";
import { useEffect, useState } from "react";
import { notification } from "antd";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import publicAxios from "../../../configAxios/publicAxios";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
const AdminVoucher = () => {
  const flaguserJSON = localStorage.getItem("flaguser");
  const flaguser = flaguserJSON ? JSON.parse(flaguserJSON) : null;
  const navigate = useNavigate();
  useEffect(() => {
    if (flaguser?.roles != 1) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flaguser]);
  const [show, setShow] = useState(false);
  const [voucherName, setVoucherName] = useState("");
  const [voucherDiscount, setVoucherDiscount] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  interface Voucher {
    voucher_id: number;
    voucher_discount: number;
    voucher_name: string;
  }
  const [voucher, setVoucher] = useState<Voucher[]>([]);
  const loadVoucher = async () => {
    const response = await publicAxios.get("/api/v1/voucher");
    setVoucher(response.data.voucher);
  };

  useEffect(() => {
    loadVoucher();
  }, []);

  const handleAddVoucher = () => {
    handleShow();
  };

  const handleVoucherNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVoucherName(e.target.value);
  };

  const handleVoucherDiscountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVoucherDiscount(Number(e.target.value));
  };

  const handleVoucherSubmit = async () => {
    const newVoucher = {
      voucherName,
      voucherDiscount,
    };
    const response = await publicAxios.post("/api/v1/voucher", newVoucher);
    if (response.data.status === 201) {
      notification.success({
        message: "Thêm voucher thành công",
      });
      loadVoucher();
    }
    setVoucherName("");
    setVoucherDiscount(0);
    handleClose();
  };
  const handleDeleteVoucher = async (id: number) => {
    const response = await publicAxios.delete(`/api/v1/voucher/${id}`);
    if (response.data.status === 200) {
      notification.success({
        message: "Xóa voucher thành công",
      });
      loadVoucher();
    }
  };
  return (
    <div>
      <HeaderAdmin />
      <div className="container_shop">
        <SidebarAdmin />
        <div className="container_right1">
          <h2>Quản lí đơn hàng</h2>
          <div className="addVoucher">
            <button
              className="btn-addVoucher"
              onClick={() => handleAddVoucher()}
            >
              +
            </button>
          </div>
          <div className="list-product">
            <table className="order-user">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên Voucher</th>
                  <th>Giảm giá</th>
                  <th colSpan={2}>Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {voucher?.map((voucher: any, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{voucher.voucher_name}</td>
                    <td>
                      {voucher.voucher_discount} {"%"}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteVoucher(voucher.voucher_id)}
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm voucher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-row">
            <label className="voucher-label">Tên Voucher:</label>
            <input
              type="text"
              value={voucherName}
              className="name-voucher"
              onChange={handleVoucherNameChange}
            />
          </div>
          <div>
            <label className="voucher-label">Phần trăm giảm giá:</label>
            <input
              type="number"
              value={voucherDiscount}
              className="discount-voucher"
              onChange={handleVoucherDiscountChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleVoucherSubmit}>
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminVoucher;

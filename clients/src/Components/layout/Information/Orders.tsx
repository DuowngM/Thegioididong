import { useEffect, useState } from "react";
import publicAxios from "../../../configAxios/publicAxios";
import "../../css/Information.css";
import Header from "../Header/Header";
import Sidebar from "./Sidebar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Footer from "../Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";

const Orders = () => {
  const flaguserJSON = localStorage.getItem("flaguser");
  const flaguser = flaguserJSON ? JSON.parse(flaguserJSON) : null;
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (id != flaguser?.user_id) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const [show, setShow] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const handleClose = () => {
    setShow(false);
    setSelectedOrderId(null);
  };

  const handleShow = () => setShow(true);

  interface Order {
    order_id: number;
    customerId: number;
    total: number;
    note: string;
    createdDate: string;
    status: string;
    method: string;
    user_name: string;
    phoneNumber: number;
  }

  const [order, setOrder] = useState<Order[]>([]);

  const loadOrder = async () => {
    const response = await publicAxios.get(
      `/api/v1/order/${flaguser?.user_id}`
    );
    setOrder(response.data.order);
    let total = 0;
    for (const orderItem of response.data.order) {
      total += orderItem.total;
    }
    setTotalAmount(total);
  };

  useEffect(() => {
    loadOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  interface OrderDetails {
    order_id: number;
    quantity: number;
    address: string;
    product_image: string;
    product_name: string;
    price: number;
    total: number;
  }

  const [orderDetails, setOrderDetails] = useState<OrderDetails[]>([]);

  const handleViewOrder = async (orderId: number) => {
    handleShow();
    setSelectedOrderId(orderId);
    const response = await publicAxios.get(`/api/v1/orderDetails/${orderId}`);
    if (response.data.status === 200) {
      setOrderDetails(response.data.orderDetails);
    }
  };

  return (
    <>
      <Header />
      <div className="container_profile">
        <Sidebar />
        <div className="profile_right">
          <h1>Đơn hàng đã đặt</h1>
          <table className="order-user">
            <thead>
              <th>STT</th>
              <th>Số điện thoại</th>
              <th>Tổng tiền</th>
              <th>Note</th>
              <th>Ngày mua</th>
              <th>Trạng thái</th>
              <th>Phương thức</th>
              <th>Xem</th>
            </thead>
            <tbody>
              {order?.map((order, index) => (
                <>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{order.phoneNumber}</td>
                    <td>{order.total.toLocaleString() + "₫"}</td>
                    <td>{order.note}</td>
                    <td>{order.createdDate}</td>
                    <td>{order.status}</td>
                    <td>{order.method}</td>
                    <td>
                      <button onClick={() => handleViewOrder(order.order_id)}>
                        Xem chi tiết đơn hàng
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={7} className="total-amount">
                  Tổng tiền mua hàng:{" "}
                  <b>{totalAmount.toLocaleString() + "₫"}</b>
                </td>
              </tr>
            </tfoot>
          </table>
          <Modal show={show && selectedOrderId !== null} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Chi tiết đơn hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <table className="order-details">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên sản phẩm</th>
                    <th>Ảnh</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                    <th>Địa chỉ</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails?.map((orderDetail, index) => (
                    <>
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{orderDetail.product_name}</td>
                        <td>
                          <img src={orderDetail.product_image} width={100} />
                        </td>
                        <td>{orderDetail.price.toLocaleString() + "₫"}</td>
                        <td>{orderDetail.quantity}</td>
                        <td>
                          {(
                            orderDetail.price * orderDetail.quantity
                          ).toLocaleString() + "₫"}
                        </td>
                        <td>{orderDetail.address}</td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Orders;

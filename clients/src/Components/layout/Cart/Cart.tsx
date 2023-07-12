import Header from "../Header/Header";
import "../../css/Cart.css";
import { useEffect, useState } from "react";
import { notification } from "antd";
import publicAxios from "../../../configAxios/publicAxios";
import Footer from "../Footer/Footer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { renderCart } from "../../../redux/cart";
import { useAppDispatch } from "../../../redux/hook";
import { useLocation } from "react-router-dom";
const Cart = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  const dispatch = useAppDispatch();
  const flaguserJSON = localStorage.getItem("flaguser");
  const flaguser = flaguserJSON ? JSON.parse(flaguserJSON) : null;
  interface Cart {
    cart_id: number;
    user_id: number;
    product_id: number;
    quantity: number;
    product_name: string;
    product_image: string;
    price: number;
    product_stocks: number;
  }
  interface Branch {
    brand_id: number;
    city: string;
    address: string;
    contact: string;
  }
  const [branches, setBranches] = useState<Branch[]>([]);
  const loadBranches = async () => {
    const response = await publicAxios.get(`api/v1/branch`);
    if (response.data.status === 200) {
      setBranches(response.data.branch);
    }
  };
  const [address, setAddress] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("");

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleDeliveryOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeliveryOption(event.target.value);
  };
  const [cart, setCart] = useState<Cart[]>([]);
  const loadCart = async () => {
    const response = await publicAxios.get(`api/v1/cart/${flaguser.user_id}`);
    if (response.data.status === 200) {
      setCart(response.data.cart);
    }
  };
  useEffect(() => {
    loadCart();
    loadBranches();
  }, []);

  const increaseQuantity = (index: number) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
  };

  const decreaseQuantity = (index: number) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
    }
  };
  const calculateTotalQuantity = () => {
    let totalQuantity = 0;
    cart?.forEach((item) => {
      totalQuantity += item.quantity;
    });
    return totalQuantity;
  };
  const calculateTotalMoney = () => {
    let totalMoney = 0;
    cart?.forEach((item) => {
      totalMoney += item.price * item.quantity;
    });
    return totalMoney;
  };
  const [selectedBranch, setSelectedBranch] = useState("");
  const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBranchId = event.target.value;
    setSelectedBranch(selectedBranchId);
  };
  const [voucher, setVoucher] = useState("");

  const [handleVoucher, setHandleVoucher] = useState<any>({});
  const [isClicked, setIsClicked] = useState(false);

  const handleAddDiscount = async () => {
    if (!voucher) {
      notification.error({
        message: "Vui lòng điền voucher",
      });
      return;
    }
    const response = await publicAxios.get(`/api/v1/voucher/${voucher}`);
    if (response.data.status === 200) {
      setHandleVoucher(response.data.voucher[0]);
      setIsClicked(true);
    }
  };

  const calculatePaymentTotal = (): number => {
    let totalMoney: number = calculateTotalMoney();
    if (handleVoucher && handleVoucher.voucher_discount) {
      const discountAmount =
        +totalMoney * Number(handleVoucher.voucher_discount / 100);
      totalMoney -= +discountAmount;
    }

    return totalMoney;
  };
  const userId = flaguser?.user_id;
  const [changeLocal, setChangeLocal] = useState(0);
  const handleDeleteProduct = async (e: number) => {
    const response = await publicAxios.delete(`/api/v1/cart/${e}/${userId}`);
    if (response.data.status === 200) {
      notification.success({
        message: "Đã xóa sản phẩm khỏi giỏ hàng",
      });
      loadCart();
      localStorage.setItem(
        "change",
        JSON.stringify(Math.floor(Math.random() * 1000000000))
      );
      const change = localStorage.getItem("change");
      const effectChange = change ? JSON.parse(change) : undefined;
      setChangeLocal(effectChange);
    }
  };
  useEffect(() => {
    dispatch(renderCart(userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeLocal]);
  const [note, setNote] = useState("");
  const idUser = flaguser?.user_id;

  const handlePay = async () => {
    for (const item of cart) {
      if (item.quantity > item.product_stocks) {
        notification.error({
          message: `Số lượng trong kho của sản phẩm ${item.product_name} là: ${item.product_stocks}`,
        });
        return;
      }
    }
    const newOrder = {
      customerId: flaguser?.user_id,
      total: calculatePaymentTotal(),
      note,
      method: deliveryOption,
    };
    const response = await publicAxios.post("/api/v1/order", newOrder);
    const order = response.data[0];
    const orderDetails = cart.map((item) => {
      let addressValue = "";
      if (deliveryOption === "home_delivery") {
        addressValue = address;
      } else if (deliveryOption === "store_pickup") {
        if (selectedBranch) {
          addressValue = selectedBranch;
        }
      }
      return {
        order_id: order?.order_id,
        idProduct: item.product_id,
        quantity: item.quantity,
        address: addressValue,
      };
    });
    const response2 = await publicAxios.post(
      "/api/v1/orderDetails",
      orderDetails
    );
    if (response2.data.status === 200) {
      await publicAxios.put("/api/v1/products", orderDetails);
      await publicAxios.delete(`/api/v1/cart?idUser=${idUser}`);
      loadCart();
      notification.success({
        message: "THANH TOÁN THÀNH CÔNG",
      });
    }
  };

  return (
    <>
      <Header />
      <section className="section_cart">
        <div className="header-cart">
          {" "}
          <h2>
            <ShoppingCartIcon style={{ fontSize: 50 }} />
            Giỏ hàng của bạn
          </h2>
        </div>
        <div className="middleCart">
          <ul className="list-cart">
            {cart?.map((cart, index) => (
              <li className="cart-item" key={index}>
                <div className="cart__item">
                  <div className="imgSp">
                    <button
                      className="handleDeleteProduct"
                      onClick={() => handleDeleteProduct(cart?.product_id)}
                    >
                      X
                    </button>
                    <img src={cart?.product_image} width={100} />
                  </div>
                  <div className="nameSp" style={{ width: "240px" }}>
                    <p>{cart?.product_name}</p>
                  </div>
                  <div className="buttons_added">
                    <input
                      className="minus is-form"
                      type="button"
                      defaultValue="-"
                      onClick={() => decreaseQuantity(index)}
                    />
                    <input
                      aria-label="quantity"
                      className="input-qty"
                      value={cart?.quantity}
                      type="number"
                    />
                    <input
                      className="plus is-form"
                      type="button"
                      defaultValue="+"
                      onClick={() => increaseQuantity(index)}
                    />
                  </div>
                  <div className="priceSp">
                    <p>
                      {(cart?.price * cart?.quantity).toLocaleString() + "₫"}{" "}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="total-provisional">
            <span className="total-product-quantity">
              <span className="total-label">Tạm tính </span>
              {calculateTotalQuantity()} sản phẩm
            </span>
            <span className="temp-total-money">
              {calculateTotalMoney().toLocaleString() + "₫"}
            </span>
          </div>
          <hr />
          <div className="infor-customer">
            <h3>Thông tin khách hàng</h3>
            <div className="gender-customer">
              <input type="radio" name="gender" />
              <label
                style={{
                  display: "inline-block",
                  paddingRight: "20px",
                  paddingLeft: "5px",
                }}
              >
                Anh
              </label>
              <input type="radio" name="gender" />
              <label
                style={{
                  display: "inline-block",
                  paddingLeft: "5px",
                }}
              >
                Chị
              </label>
            </div>
            <div className="name-customer">
              <div>
                <input
                  type="text"
                  className="name_customer"
                  placeholder="Họ và tên"
                  value={flaguser?.user_name}
                />
              </div>
              <div>
                <input
                  type="text"
                  className="name_customer"
                  placeholder="Số điện thoại"
                  value={flaguser?.phoneNumber}
                />
              </div>
            </div>
            <div className="delivery">
              <h5>Chọn cách thức nhận hàng</h5>
              <div className="pick-delivery">
                <input
                  type="radio"
                  name="dlvr"
                  value="home_delivery"
                  onChange={handleDeliveryOptionChange}
                />
                <label
                  style={{
                    display: "inline-block",
                    paddingRight: "20px",
                    paddingLeft: "5px",
                  }}
                >
                  Giao hàng tận nơi
                </label>
                <input
                  type="radio"
                  name="dlvr"
                  value="store_pickup"
                  onChange={handleDeliveryOptionChange}
                />
                <label
                  style={{
                    display: "inline-block",
                    paddingLeft: "5px",
                  }}
                >
                  Nhận tại cửa hàng
                </label>
                {deliveryOption === "home_delivery" && (
                  <div className="address">
                    <input
                      type="text"
                      className="addressInput"
                      placeholder="Địa chỉ giao hàng"
                      value={address}
                      onChange={handleAddressChange}
                    />
                  </div>
                )}
                {deliveryOption === "store_pickup" && (
                  <div className="pickup-branches">
                    <h5>Danh sách cửa hàng</h5>
                    <select
                      value={selectedBranch}
                      onChange={handleBranchChange}
                    >
                      <option value="">Chọn cửa hàng</option>
                      {branches.map((branch) => (
                        <option key={branch.brand_id} value={branch.brand_id}>
                          {branch.city}, {branch.address}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div className="more-option">
                <input
                  type="text"
                  className="options"
                  placeholder="Yêu cầu khác"
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="coupou">
            <h5>Mã giảm giá</h5>
            <input
              type="text"
              className="addCoupou"
              placeholder="Nhập mã giảm giá"
              onChange={(e) => setVoucher(e.target.value)}
            />
            <button className="discount" onClick={() => handleAddDiscount()}>
              Áp dụng
            </button>
            {isClicked ? (
              handleVoucher ? (
                <p>Áp dụng ưu đãi thành công</p>
              ) : !handleVoucher ? (
                <p>Voucher không tồn tại</p>
              ) : null
            ) : null}
          </div>
          <hr />
          <div className="total-money">
            <p>Tổng tiền: {calculateTotalMoney().toLocaleString() + "₫"}</p>
            <p>
              Mã giảm giá:{" "}
              {handleVoucher?.voucher_discount
                ? handleVoucher.voucher_discount + "%"
                : "Không có voucher áp dụng"}
            </p>
            <p>Thanh toán: {calculatePaymentTotal().toLocaleString() + "₫"}</p>
            <button className="btn-paying" onClick={handlePay}>
              Thanh toán
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Cart;

/* eslint-disable @typescript-eslint/no-explicit-any */
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Rate } from "antd";
import { notification } from "antd";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import "../../css/Details.css";
import { useAppDispatch } from "../../../redux/hook";
import { addToCart } from "../../../redux/cart";
import { ratings } from "../../../redux/rate";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import publicAxios from "../../../configAxios/publicAxios";
import { useEffect, useState } from "react";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { renderCart } from "../../../redux/cart";
const Details = () => {
  const { id } = useParams();
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  const [detailsProduct, setDetailsProduct] = useState<any>({});
  const loadProduct = async () => {
    const response = await publicAxios.get(`/api/v1/products/details/${id}`);
    setDetailsProduct(response.data.products[0]);
  };
  useEffect(() => {
    loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const flaguserJSON = localStorage.getItem("flaguser");
  const flaguser = flaguserJSON ? JSON.parse(flaguserJSON) : null;
  const userId = flaguser?.user_id;
  const dispatch = useAppDispatch();
  const [changeLocal, setChangeLocal] = useState(0);
  const handleAddToCart = (productId: number) => {
    if (!flaguser) {
      notification.error({
        message: "Đăng nhập để mua hàng",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return;
    }
    dispatch(addToCart({ productId, userId }));
    localStorage.setItem(
      "change",
      JSON.stringify(Math.floor(Math.random() * 1000000000))
    );
    const change = localStorage.getItem("change");
    const effectChange = change ? JSON.parse(change) : undefined;
    setChangeLocal(effectChange);
  };
  useEffect(() => {
    dispatch(renderCart(userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeLocal]);
  interface Rate {
    rate_id: number;
    pro_id: number;
    idUser: number;
    rate_points: number;
    comment: string;
    user_name: string;
  }
  const [renderRate, setRenderRate] = useState<Rate[]>([]);
  const loadRate = async () => {
    try {
      const response = await publicAxios.get(`/api/v1/rate/${id}`);
      setRenderRate(response.data.rate);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadRate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [rate, setRate] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const navigate = useNavigate();
  const handleRate = async (pro_id: number) => {
    if (!flaguser) {
      notification.error({
        message: "Đăng nhập để bình luận",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return;
    }
    await dispatch(ratings({ pro_id, rate, comment, userId }));

    setComment("");
    loadRate();
  };

  const calculateAverageRating = (ratings: Rate[]) => {
    if (ratings.length === 0) {
      return 0;
    }
    const totalRating = ratings.reduce(
      (sum: number, rate: Rate) => sum + rate.rate_points,
      0
    );
    const averageRating = totalRating / ratings.length;
    return averageRating;
  };
  const averageRating = calculateAverageRating(renderRate);
  const handleDeleteRate = async (id: number) => {
    try {
      const response = await publicAxios.delete(`/api/v1/rate/${id}`);
      if (response.data.status === 200) {
        notification.success({
          message: "Xóa bình luận thành công",
        });
        loadRate();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="container_detail">
        <div className="header-details">
          <h1 style={{ padding: "30px 0" }}>
            Chi tiết sản phẩm <ChecklistIcon style={{ fontSize: 50 }} />
          </h1>
        </div>
        <div className="detail_main">
          <div className="detail_letf">
            <div className="image_detailPr">
              <img
                src={detailsProduct?.product_image}
                width={475}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="detail_right">
            <div className="content_detail">
              <p>
                {" "}
                <span className="span1">Yêu Thích</span>{" "}
                <span style={{ fontSize: "1.425rem" }}>
                  {detailsProduct?.product_name} (Đã bán: {detailsProduct?.sold}
                  )
                </span>
              </p>
              <div className="danhgia">
                <div className="danhgia1">
                  <div className="rate">
                    <p style={{ fontSize: 20 }}>
                      <b>
                        Điểm: {averageRating.toFixed(1)}/5 ({renderRate?.length}{" "}
                        lượt đánh giá)
                      </b>
                    </p>
                    <Rate
                      allowHalf
                      value={Math.ceil(averageRating)}
                      style={{ color: "#ee4d2d" }}
                      disabled
                    />
                  </div>
                  <div className="img-gif">
                    <img
                      src="https://ticketbox.vn/_next/static/images/loading.gif"
                      width={300}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="price_detail">
              <span>Giá không đổi:</span>
              <span className="price_detail1">
                {detailsProduct?.price?.toLocaleString() + `đ`}
              </span>
              <div className="price_detail2">
                <p style={{ color: "rgba(0,0,0,.54)", fontSize: ".85rem" }}>
                  Giá tốt nhất so với các sản phẩm cùng loại trên Shopee
                </p>
              </div>
            </div>

            <div className="prire__detail">
              <p> {detailsProduct?.product_stocks} sản phẩm sẵn có</p>
            </div>
            <div className="add_detail">
              <div className="btn_add">
                <button
                  onClick={() => handleAddToCart(detailsProduct?.product_id)}
                  disabled={detailsProduct?.product_stocks === 0}
                >
                  <AddShoppingCartOutlinedIcon style={{ fontSize: 17 }} />{" "}
                  <span>Thêm Vào Giỏ Hàng</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="descripttion">
          <div className="mota">MÔ TẢ SẢN PHẨM</div>
          <div className="content_mota">
            <p>{detailsProduct?.description}</p>
          </div>
        </div>
        <div className="rate">
          <Rate
            allowHalf
            value={rate}
            onChange={(value) => setRate(value)}
            style={{ color: "#ee4d2d", fontSize: "20px !important" }}
          />
          <span>(Đánh giá từ 1 - 5 sao)</span>
          <textarea
            cols={100}
            rows={5}
            style={{ display: "block", padding: "10px", outline: "none" }}
            value={comment}
            placeholder="Nhập bình luận"
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button
            className="btn-rate"
            onClick={() => handleRate(detailsProduct.product_id)}
          >
            Đánh giá
          </button>
          <hr />
          <h3>Đánh giá</h3>
          {renderRate?.map((rate, index) => (
            <>
              <div
                key={index}
                style={{
                  border: "3px solid #ffe45c",
                  marginBottom: 20,
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                <p style={{ fontSize: "15px", color: "black" }}>
                  <div
                    style={{
                      fontSize: "17px",
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>{rate.user_name}: </div>
                    <div>
                      {userId === rate.idUser && (
                        <button
                          style={{ width: 30, height: 30, border: "none" }}
                          onClick={() => handleDeleteRate(rate.rate_id)}
                        >
                          X
                        </button>
                      )}
                    </div>
                  </div>
                  {rate.comment}
                </p>
                <Rate
                  allowHalf
                  value={rate.rate_points}
                  style={{ color: "#ee4d2d" }}
                  disabled
                />
              </div>
            </>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Details;

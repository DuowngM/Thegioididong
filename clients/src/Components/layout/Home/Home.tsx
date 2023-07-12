import banner from "./img/des-1920x450-2.jpg";
import Slider from "react-slick";
import "../../css/Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "./img/1.png";
import img2 from "./img/2.png";
import img3 from "./img/3.png";
import img4 from "./img/4.png";
import topImg from "./img/5.png";
import Header from "../Header/Header";
import { Card, notification } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../redux/hook";
import { addToCart } from "../../../redux/cart";
import { renderCart } from "../../../redux/cart";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  interface Products {
    product_id: number;
    product_name: string;
    product_stocks: number;
    description: string;
    price: number;
    categoryId: number;
    brandId: number;
    product_image: string;
  }
  const [products, setProducts] = useState<Products[] | null>([]);
  const flaguserJSON = localStorage.getItem("flaguser");
  const flaguser = flaguserJSON ? JSON.parse(flaguserJSON) : null;
  const dispatch = useAppDispatch();
  const loadProducts = async () => {
    const response = await axios.get("http://localhost:8000/api/v1/products");
    const sortedProducts = response.data.products.sort(
      (a: Products, b: Products) => a.price - b.price
    );
    setProducts(sortedProducts);
  };
  useEffect(() => {
    loadProducts();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const [changeLocal, setChangeLocal] = useState(0);
  const userId = flaguser?.user_id;
  const handleAddToCart = (productId: number) => {
    if (!flaguser) {
      notification.error({
        message: "Đăng nhập trước khi mua hàng",
      });
      navigate("/login");
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

  return (
    <>
      <Header />
      <div className="big_banner">
        <img src={banner} alt="" width={1803} />
      </div>
      <section className="main__container">
        <div className="home__slider">
          <Slider {...settings}>
            <div>
              <img src={img1} alt="" />
            </div>
            <div>
              <img src={img2} alt="" />
            </div>
            <div>
              <img src={img3} alt="" />
            </div>
            <div>
              <img src={img4} alt="" />
            </div>
          </Slider>
        </div>
        <ul className="option-promo">
          <li>
            <a href="https://www.thegioididong.com/dtdd/oppo-a98-5g">
              {" "}
              <img
                width={50}
                height={50}
                data-src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/Group-427319497-200x200.png"
                className=" ls-is-cached lazyloaded"
                alt="Hot Sale<br>OPPO A98 5G"
                src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/Group-427319497-200x200.png"
              />
              <p style={{ fontSize: "18px" }}>
                Hot Sale
                <br />
                OPPO A98 5G
              </p>
            </a>
          </li>
          <li>
            <a href="https://www.thegioididong.com/laptop-tuu-truong">
              <img
                width={50}
                height={50}
                data-src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/icon-xakho-120x120-3.png"
                className=" ls-is-cached lazyloaded"
                alt="Mua Sớm<br>Rẻ Hơn"
                src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/icon-xakho-120x120-3.png"
              />
              <span>
                Mua Sớm
                <br />
                Rẻ Hơn
              </span>
            </a>
          </li>
          <li>
            <a href="https://www.thegioididong.com/mua-online-gia-re">
              <img
                width={50}
                height={50}
                data-src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/100x100-100x100-41.png"
                className=" ls-is-cached lazyloaded"
                alt="Giảm đến 50%++"
                src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/100x100-100x100-41.png"
              />
              <span>Giảm đến 50%++</span>
            </a>
          </li>
          <li>
            <a href="https://www.thegioididong.com/uu-dai-soc">
              <img
                width={50}
                height={50}
                data-src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/120x120-245x248.png"
                className=" lazyloaded"
                alt="Cuối Tuần<br>Giảm Sốc"
                src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn//content/120x120-245x248.png"
              />
              <span>
                Cuối Tuần
                <br />
                Giảm Sốc
              </span>
            </a>
          </li>
        </ul>
        <div className="hot-deal">
          <div className="promo-banner" style={{ backgroundColor: "#FAA118" }}>
            <div className="top-banner">
              <NavLink to="/">
                <img src={topImg} width={1195} height={150} />
              </NavLink>
            </div>
            <div className="list-product">
              {products?.map((product, index) => (
                <div className="element-product" key={index}>
                  <Card
                    hoverable
                    style={{
                      width: 200,
                      minHeight: 500,
                      paddingTop: 20,
                    }}
                    cover={
                      <div
                        style={{ height: "200px" }}
                        onClick={() =>
                          navigate(`/details-product/${product.product_id}`)
                        }
                      >
                        <img
                          style={{ width: "100%" }}
                          alt="example"
                          src={product.product_image}
                        />
                      </div>
                    }
                    key={index}
                  >
                    <div className="info-product">
                      <p className="name-product">
                        <b>{product.product_name}</b>
                      </p>
                      <p className="price-product">
                        {product.price.toLocaleString() + "₫"}
                      </p>
                      <p>
                        <b>
                          Stocks:{" "}
                          {product.product_stocks === 0
                            ? "Sold Out"
                            : product.product_stocks}
                        </b>
                      </p>
                      <button
                        className={`btn-add ${
                          product.product_stocks === 0 ? "btn-disabled" : ""
                        }`}
                        onClick={() => handleAddToCart(product.product_id)}
                        disabled={product.product_stocks === 0}
                      >
                        Thêm vào giỏ hàng
                      </button>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;

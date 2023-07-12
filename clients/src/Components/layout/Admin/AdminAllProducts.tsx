import axios from "axios";
import "../../css/AddProducts.css";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";
import { useEffect, useState } from "react";
import publicAxios from "../../../configAxios/publicAxios";
import { notification } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
const AdminAddProduct = () => {
  const flaguserJSON = localStorage.getItem("flaguser");
  const flaguser = flaguserJSON ? JSON.parse(flaguserJSON) : null;
  const navigate = useNavigate();
  useEffect(() => {
    if (flaguser?.roles != 1) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flaguser]);
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
  interface CategoryList {
    category_id: number;
    category_name: string;
  }
  interface BrandList {
    brand_id: number;
    brand_name: string;
    category_id: number;
  }
  const [category, setCategory] = useState<CategoryList[] | null>([]);
  const [brand, setBrand] = useState<BrandList[] | null>([]);
  const [products, setProducts] = useState<Products[] | null>([]);
  const loadProducts = async () => {
    const response = await axios.get("http://localhost:8000/api/v1/products");
    setProducts(response.data.products);
  };
  const loadCategory = async () => {
    const response = await axios.get("http://localhost:8000/api/v1/category");
    setCategory(response.data.category);
  };
  const loadBrand = async () => {
    const response = await axios.get(`http://localhost:8000/api/v1/brand`);
    setBrand(response.data.brand);
  };
  useEffect(() => {
    loadProducts();
    loadCategory();
    loadBrand();
  }, []);

  const getBrandName = (brandId: number) => {
    const brandItem = brand?.find((item) => item.brand_id === brandId);
    return brandItem ? brandItem.brand_name : "";
  };

  const getCategoryName = (categoryId: number) => {
    const categoryItem = category?.find(
      (item) => item.category_id === categoryId
    );
    return categoryItem ? categoryItem.category_name : "";
  };
  const handleDeleteProduct = async (id: number) => {
    const response = await publicAxios.delete(`/api/v1/products/${id}`);
    if (response.data.status === 200) {
      notification.success({
        message: "Xóa sản phẩm thành công",
      });
      loadProducts();
    }
  };
  return (
    <div>
      <HeaderAdmin />
      <div className="container_shop">
        <SidebarAdmin />
        <div className="container_right1">
          <h2>Toàn bộ sản phẩm</h2>
          <div className="list-product">
            <table className="list_product">
              <thead>
                <th>STT</th>
                <th>Ảnh sản phẩm</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng trong kho</th>
                <th>Giá</th>
                <th>Mô tả</th>
                <th>Loại sản phẩm</th>
                <th>Hãng sản xuất</th>
                <th>Chức năng</th>
              </thead>
              <tbody>
                {products &&
                  products.map((product, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <img src={product.product_image} width={100} />
                      </td>
                      <td>{product.product_name}</td>
                      <td>{product.product_stocks}</td>
                      <td>{product.price.toLocaleString() + "₫"}</td>
                      <td width={400}>{product.description}</td>
                      <td>{getCategoryName(product.categoryId)}</td>
                      <td>{getBrandName(product.brandId)}</td>
                      <td>
                        <button
                          onClick={() =>
                            handleDeleteProduct(product.product_id)
                          }
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
    </div>
  );
};
export default AdminAddProduct;

const express = require("express");
const server = express();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/users.routes");
const categoryRoutes = require("./routes/category.routes");
const brandRoutes = require("./routes/brand.routes");
const productsRoutes = require("./routes/products.routes");
const cartRoutes = require("./routes/cart.routes");
const branchesRoutes = require("./routes/branch.routes");
const voucherRoutes = require("./routes/voucher.routes");
const orderRoutes = require("./routes/order.routes");
const orderDetails = require("./routes/order-details.routes");
const imagesRoutes = require("./routes/images.routes");
const rateRoutes = require("./routes/rate.routes");
server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
server.use(morgan("dev"));
server.use(cors());
server.use(express.static("public"));
//Router
server.use("/api/v1/users", usersRoutes);
server.use("/api/v1/category", categoryRoutes);
server.use("/api/v1/brand", brandRoutes);
server.use("/api/v1/products", productsRoutes);
server.use("/api/v1/cart", cartRoutes);
server.use("/api/v1/branch", branchesRoutes);
server.use("/api/v1/voucher", voucherRoutes);
server.use("/api/v1/order", orderRoutes);
server.use("/api/v1/orderDetails", orderDetails);
server.use("/api/v1/images", imagesRoutes);
server.use("/api/v1/rate", rateRoutes);
//PORT
server.listen(8000, () => {
  console.log("http://localhost:8000");
});

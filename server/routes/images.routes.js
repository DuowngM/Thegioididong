const express = require("express");
const database = require("../utils/database");

const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.split(".")[1];
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + `.${ext}`;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
}).array("images", 5);

router.post("/", async (req, res) => {
  upload(req, res, async function (err) {
    const images = req.files.map(
      (file) => `http://localhost:8000/images/${file.filename}`
    );

    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        message: "Failed to upload",
        error: err.message,
      });
    } else if (err) {
      return res.status(400).json({
        message: "Failed to upload",
        error: err.message,
      });
    }

    const { userId } = req.body;

    try {
      for (let i = 0; i < images.length; i++) {
        await database.execute(
          `INSERT INTO thegioididong.images (image, idProduct) VALUES (?, ?)`,
          [images[i], +userId]
        );
      }
      res.json({
        status: "Success",
      });
    } catch (error) {
      console.log("Insert failed", error);
      return res.status(500).json({
        status: 500,
        message: "Failed",
        error: error.message,
      });
    }
  });
});

module.exports = router;

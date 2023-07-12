const express = require("express");
const router = express.Router();
const database = require("../utils/database");
router.get("/", async (req, res) => {
  try {
    let [category] = await database.execute("SELECT * FROM category");
    res.json({
      status: 200,
      category,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const database = require("../utils/database");
router.get("/", async (req, res) => {
  try {
    let [brand] = await database.execute("SELECT * FROM brand");
    res.json({
      status: 200,
      brand,
    });
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let [brand] = await database.execute(
      "SELECT * FROM brand where category_id = ?",
      [id]
    );
    res.json({
      status: 200,
      brand,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const database = require("../utils/database");
router.get("/", async (req, res) => {
  try {
    let [branch] = await database.execute("SELECT * FROM branch");
    res.json({
      status: 200,
      branch,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

const express = require("express");
const router  = express.Router();
const { getAll, create, update, remove } = require("../controllers/category");
const { authCheck } = require("../middleware/auth");

router.get("/categories",        authCheck, getAll);
router.post("/categories",       authCheck, create);
router.put("/categories/:id",    authCheck, update);
router.delete("/categories/:id", authCheck, remove);

module.exports = router;
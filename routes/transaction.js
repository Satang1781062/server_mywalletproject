const express = require("express");
const router  = express.Router();
const { getAll, create, update, remove } = require("../controllers/transaction");
const { authCheck } = require("../middleware/auth");

router.get("/transactions",        authCheck, getAll);
router.post("/transactions",       authCheck, create);
router.put("/transactions/:id",    authCheck, update);
router.delete("/transactions/:id", authCheck, remove);

module.exports = router;
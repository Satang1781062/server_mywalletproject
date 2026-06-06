const express = require("express");
const router  = express.Router();

const {
  getAll,
  getOne,
  create,
  update,
  remove,
} = require("../controllers/wallet");

const { authCheck } = require("../middleware/auth");

router.get("/wallets",      authCheck, getAll);
router.get("/wallets/:id",   authCheck, getOne);
router.post("/wallets",     authCheck, create);
router.put("/wallets/:id",   authCheck, update);
router.delete("/wallets/:id",authCheck, remove);

module.exports = router;
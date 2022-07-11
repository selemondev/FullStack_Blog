const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { updateUser, deleteUser } = require("../controllers/userController");
router.route("/updateUser/:id").put(protect, updateUser);
router.route("/deleteUser/:id").delete(protect, deleteUser)
module.exports = router;
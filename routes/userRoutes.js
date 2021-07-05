const { Router } = require("express");
const userController = require("../controllers/userController");

const router = Router();

router.get("/sign-up", userController.user_create);
router.post("/sign-up", userController.user_create_post);
router.get("/log-in", userController.user_login);
router.post("/log-in", userController.user_login_post);

module.exports = router;

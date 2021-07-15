const { Router } = require("express");
const blogController = require("../controllers/blogController");
const { requireUser } = require("../middlewares/userMiddlewares");

const router = Router();

router.get("/create", requireUser, blogController.blog_create);
router.get("/", blogController.blog_index);
router.post("/", requireUser, blogController.blog_create_post);
router.put("/:id", blogController.blog_update_post);
router.get("/:id", blogController.blog_details);
router.delete("/:id", blogController.blog_delete);

module.exports = router;

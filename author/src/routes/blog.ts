import express from "express"
import { isAuth } from "../middlewares/isAuth.js";
import { createBlog, deleteBlog, updateBlog } from "../controllers/blog.js";
import uploadFile from "../middlewares/multer.js";

const router = express()

router.post("/blog/new",isAuth,uploadFile,createBlog)
router.put("/blog/:id",isAuth,uploadFile,updateBlog)
router.delete("/blog/:id",isAuth,deleteBlog)

export default router;
import express from "express";
// {checkToken} = require('../middlewares/auth');
import {getAll, getById, getByUserId, postOne, updateById, deleteById, getByTitleId, searchArticle} from "../controllers/article.controller"
import { checkToken } from "../middleware/auth";
const router = express.Router();

router.post("/", checkToken, postOne);
router.post("/search", searchArticle);
router.get("/:page", getAll);
router.get("/read/:titleid", getByTitleId);
router.get("/user/page", getByUserId);
router.put("/:id", checkToken, updateById);
router.delete("/:id", checkToken, deleteById);

export default router;
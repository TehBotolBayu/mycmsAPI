import express from "express";
// {checkToken} = require('../middlewares/auth');
import {getAll, getById, getByUserId, postOne, updateById, deleteById, getByTitleId, searchArticle} from "../controllers/article.controller"

const router = express.Router();

router.post("/", postOne);
router.post("/search", searchArticle);
router.get("/:page", getAll);
router.get("/read/:titleid", getByTitleId);
router.get("/user/page", getByUserId);
router.put("/:id", updateById);
router.delete("/:id", deleteById);

export default router;
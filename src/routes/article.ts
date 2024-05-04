import express from "express";
// {checkToken} = require('../middlewares/auth');
import {getAll, getById, getByUserId, postOne, updateById, deleteById} from "../controllers/article.controller"

const router = express.Router();

router.post("/", postOne);
router.get("/", getAll);
router.get("/user/:id", getByUserId);
router.get("/:id", getById);
router.put("/:id", updateById);
router.delete("/:id", deleteById);

export default router;

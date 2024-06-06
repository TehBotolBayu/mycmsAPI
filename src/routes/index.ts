import express from "express";
import articleRouter from "./article";
import fileRouter from './file';

const  router = express.Router();

router.use("/article", articleRouter);
router.use("/file", fileRouter);

export default router;

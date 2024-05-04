import express from "express";
import articleRouter from "./article";

const  router = express.Router();

router.use("/article", articleRouter);

// module.exports = router;
export default router;

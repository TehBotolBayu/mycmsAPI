import express from "express";
import {postImage} from "../controllers/file.controller";
import multer from "multer";
const route = express.Router();

const multerLib = multer();

route.post('/', multerLib.single('file'), postImage);

export default route
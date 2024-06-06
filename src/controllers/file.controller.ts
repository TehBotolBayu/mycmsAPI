import express, { Express, Request, Response } from "express";
import {imageKit} from "../utils/imageKit";

export async function postImage (req: Request, res: Response) {
    try {
        const fileToString = req.file?.buffer.toString("base64");

        const uploadFile = await imageKit.upload({
            fileName: req?.file!.originalname,
            file: fileToString!,
        });
    
        return res.status(201).json({
            message: "File Uploaded",
            uploadFile
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error occured"
        });
    }
}
import express, { Express, Request, Response } from "express";
import Articles from "../models/articles";

export async function postOne(req:Request, res:Response) {
    try {
        const {title, content, author} = req.body;
        await Articles.create({title, content, author})
        return res.status(201).json(
            {message: "Content Uploaded"})
    } catch (error) {
        console.log("error: "+error);
        return res.status(500).json(
            {message: "Error occured"}
        )
    }
}

export async function getAll(req:Request, res:Response) {
    try {
        const data = await Articles.find();
        return res.status(200).json(
            {message: "Fetch success", data})
    } catch (error) {
        console.log("error: "+error);
        return res.status(404).json(
            {message: "Error occured"}
        )
    }
}

export async function getById(req:Request, res:Response) {
    try {
        const id : String = req.params.id;
        const data = await Articles.findById(id);
        if (!data) return res.status(404).json({ message: 'Item not found' });
        return res.status(200).json(
            {message: "Fetch success", data})
    } catch (error) {
        console.log("error: "+error);
        
        return res.status(404).json(
            {message: "Error occured"}
        )
    }
}

export async function getByUserId(req:Request, res:Response) {
    try {
        const id : String = req.params.id;
        const data = await Articles.find({author:id});
        if (!data) return res.status(404).json({ message: 'Item not found' });
        return res.status(200).json(
            {message: "Fetch by user id success", data})
    } catch (error) {
        console.log("error: "+error);
        return res.status(500).json(
            {message: "Error occured"}
        )
    }
}

export async function updateById(req:Request, res:Response) {
    try {
        const data = await Articles.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!data) return res.status(404).json({ message: 'Item not found' });
        return res.status(200).json(
            {message: "update success", data});
    } catch (error) {
        console.log("error: "+error);
        return res.status(500).json(
            {message: "Error occured"}
        );
    }
}

export async function deleteById(req:Request, res:Response) {
    try {
        const id : String = req.params.id;
        const data = await Articles.findByIdAndDelete(id);
        if(!data) return res.status(404).json({message: "Item not found"});
        return res.status(200).json(
            {message: "Delete success", data});
    } catch (error) {
        console.log("error: "+error);
        return res.status(500).json(
            {message: "Error occured"}
        );
    }
}
import express, { Express, Request, Response } from "express";
import Articles from "../models/articles";

// const redisClient = client().then((r)=>r);
import dotenv from "dotenv";

dotenv.config();

import Redis from 'redis';

const redisClient = Redis.createClient(process.env.REDIS_URL);

export async function postOne(req:Request, res:Response) {
    try {
        const {titleid, title, content, author, cover, tags} = req.body;
        await Articles.create({titleid, title, content, author, cover, tags})
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
        const page = parseInt(req.params.page);
        redisClient.get('articles/'+page, async (error, data) => {
            if(error){
                throw new Error(error);
            }
            if(data != null){
                return res.status(200).json(JSON.parse(data))
            } else {
                const data:any = await Articles.find().populate('author').lean().limit(5).skip(page*5).sort({createdAt: 'asc'});
                const dataWithLink = data.map((article) => {
                    return {
                        ...article,
                        links: {
                            read: '/read/'+article?.titleid
                        }
                }})
                redisClient.setex('articles/'+page, 3600, JSON.stringify({message: "Fetch success", data: dataWithLink}))
                return res.status(200).json(
                    {message: "Fetch success", data: dataWithLink})
            }
        })

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
        const data:any = await Articles.findById(id).lean();
        if (!data) return res.status(404).json({ message: 'Item not found' });
        return res.status(200).json({
            message: "Fetch by id success", 
            data
        })
    } catch (error) {
        console.log("error: "+error);
        return res.status(404).json(
            {message: "Error occured"}
        )
    }
}

export async function getByUserId(req:Request, res:Response) {
    try {
        const id = req.query.id;
        const page : number = parseInt(req.query.page as string);
        const data : any = await Articles.find({author:id}).lean().limit(5).skip(page*5).sort({createdAt: 'asc'});;
        if (!data) return res.status(404).json({ message: 'Item not found' });
        const dataWithLink = data.map((article) => {
            return {
                ...article,
                links: {
                    read: '/read/'+article?.titleid
                }
        }})
        return res.status(200).json(
            {message: "Fetch success", data: dataWithLink})
    } catch (error) {
        console.log("error: "+error);
        return res.status(500).json(
            {message: "Error occured"}
        )
    }
}

export async function getByTitleId(req:Request, res:Response) {
    try {
        const titleid : String = req.params.titleid;
        redisClient.get(`articles/${titleid}`, async (error, data) => {
            if(error){
                throw new Error(error);
            }
            if(data != null){
                return res.status(200).json(JSON.parse(data))
            } else {
                const data = await Articles.find({titleid});
                if (!data) return res.status(404).json({ message: 'Item not found' });
                redisClient.setex(`articles/${titleid}`, 3600, JSON.stringify({message: "Fetch by title success", data}))
                return res.status(200).json(
                    {message: "Fetch by title success", data})
            }
        })

    } catch (error) {
        console.log("error: "+error);
        return res.status(500).json(
            {message: "Error occured"}
        )
    }
}

export async function searchArticle(req:Request, res:Response) {
    try {
        const search : String = req.body.search;
        const data:any = await Articles.find({title: { $regex: '.*' + search + '.*' } }).lean();
        if (!data) return res.status(404).json({ message: 'Item not found' });
        const dataWithLink = data.map((article) => {
            return {
                ...article,
                links: {
                    read: '/read/'+article?.titleid
                }
        }})
        return res.status(200).json(
            {message: "Fetch success", data:dataWithLink})
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



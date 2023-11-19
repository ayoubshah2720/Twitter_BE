import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router = Router();
const client = new PrismaClient;
// tweet CRUD

// CREATE
router.post('/', async (req,res)=>{
    const {content, image, userId} = req.body;
    const result = await client.tweet.create({
        data:{
            content,
            image,
            userId
        }
    }) 
    res.status(501).json(result)
})

// GETALL
router.get('/', async (req,res)=>{
    const allTweets = await client.tweet.findMany()
    res.status(501).json(allTweets)
})

// GET_BY_ID
router.get('/:id', async (req,res)=>{
    const {id} = req.params;
    const tweet = await client.tweet.findUnique({where:{id: Number(id)}});
    !tweet && res.status(404).json({error:'Tweet Not Found!'});
    res.json(tweet);
})

// UPDATE
router.put('/:id', async (req,res)=>{
    const {id} = req.params;
    const {content, image, userId} = req.body;
    const result = await client.tweet.update({
        where:{id: Number(id)},
        data:{content, image, userId}
    })
    res.status(501).json(result);
})

// DELETE
router.delete('/:id', async (req,res)=>{
    const {id} = req.params;
    await client.tweet.delete({where:{id: Number(id)}});
    res.sendStatus(200);
})


export default router;
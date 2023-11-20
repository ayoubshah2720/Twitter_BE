import { PrismaClient,User } from "@prisma/client";
import { Request, Router } from "express";

const router = Router();
const prisma = new PrismaClient();
// tweet CRUD
type AuthRequest = Request & {user?: User}
// CREATE
router.post('/', async (req:AuthRequest,res)=>{
    const {content, image} = req.body;
    //@ts-ignore
    const { id } = req.user
    
    const result = await prisma.tweet.create({
        data:{
            content,
            image,
            userId: req?.user?.id || id
        }
    }) 
    res.status(501).json(result)
})

// GETALL
router.get('/', async (req,res)=>{
    const allTweets = await prisma.tweet.findMany({
        include: { 
            //include used to get main object with all fields
            user: { select: 
                // and this selec used to get some specific fields from inner object
            { 
                id: true,
                username: true,
                image: true,
                bio: true
            }
         } }
        // select: {
        //     //this part for the main object if you want to get some specific fields from main object
        //     id: true,
        //     content: true,
        //     user: {
        //         //this part for the inner object if you want to get some specific fields from inner
        //         select: {
        //             id: true,
        //             username: true,
        //             image: true,
        //             bio: true
        //         }
        //     }
        // }
    })
    res.status(501).json(allTweets)
})

// GET_BY_ID
router.get('/:id', async (req,res)=>{
    const {id} = req.params;
    const tweet = await prisma.tweet.findUnique({ where: { id: Number(id) }, include: { user: true } });
    !tweet && res.status(404).json({error:'Tweet Not Found!'});
    res.json(tweet);
})

// UPDATE
router.put('/:id', async (req,res)=>{
    const {id} = req.params;
    const {content, image, userId} = req.body;
    const result = await prisma.tweet.update({
        where:{id: Number(id)},
        data:{content, image, userId}
    })
    res.status(501).json(result);
})

// DELETE
router.delete('/:id', async (req,res)=>{
    const {id} = req.params;
    await prisma.tweet.delete({where:{id: Number(id)}});
    res.sendStatus(200);
})


export default router;
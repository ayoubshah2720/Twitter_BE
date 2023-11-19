import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();
// USER CRUD

// CREATE
router.post('/', async (req,res)=>{
    const {name,username,email} = req.body
    try {
        const result = await prisma.user.create({
            data:{
                email,
                name,
                username,
                bio:"Hello I'm new on Twitter."
            }
        })
        res.status(501).json(result)
    } catch (error) {
        res.status(400).json("Username and Email should be unique.!")
        // res.status(400).json(error)
    }
})

// GETALL
router.get('/',async (req,res)=>{
    const allUsers = await prisma.user.findMany({ 
        select: { 
            id: true,
            username: true,
            image: true,
            bio: true,
        }
    });
    res.json(allUsers)
})

// GET_BY_ID
router.get('/:id',async (req,res)=>{
    const {id} = req.params;
    const singleUser = await prisma.user.findUnique({ 
        where: { id: Number(id) },
        include: { tweets: true }
    });
    !singleUser && res.status(404).json({error:'User Not Found!'})
    res.json(singleUser);
})

// UPDATE
router.put('/:id', async (req,res)=>{
    const {id} = req.params;
    const {name, username, email, bio, image} = req.body
    try {
        const result = await prisma.user.update({
            where:{id: Number(id)},
            data:{ name, username, email, bio, image },
        })
        res.status(501).json(result)
    } catch (error) {
        res.status(400).json("Unable to update.")
    }
})

// DELETE
router.delete('/:id',async (req,res)=>{
    const {id} = req.params;
    await prisma.user.delete({where: {id: Number(id)}});
    res.sendStatus(200);
})


export default router;
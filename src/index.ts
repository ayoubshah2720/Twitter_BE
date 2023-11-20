import express from 'express';
import userRoutes from './routes/userRoutes'
import tweetRoutes from './routes/tweetRoutes'
import authRoutes from './routes/authRoutes'
import { authenticateToken } from './middlewares/authMiddleware';
const app = express();
app.use(express.json());
app.use('/user', authenticateToken,userRoutes)
app.use('/tweet', authenticateToken,tweetRoutes)
app.use('/auth',authRoutes)


app.get('/',(req,res)=>{
    console.log('Hello Ayoub Shah');
    res.send('Hello Ayoub Shah')
})

app.listen(3000, ()=>{
    console.log('server is ready on 3000');
})
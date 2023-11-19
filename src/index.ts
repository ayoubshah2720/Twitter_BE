import express from 'express';
import userRoutes from './routes/userRoutes'
import tweetRoutes from './routes/tweetRoutes'

const app = express();
app.use(express.json());
app.use('/user',userRoutes)
app.use('/tweet',tweetRoutes)


app.get('/',(req,res)=>{
    console.log('Hello Ayoub Shah');
    res.send('Hello Ayoub Shah')
})

app.listen(3000, ()=>{
    console.log('server is ready on 3000');
})
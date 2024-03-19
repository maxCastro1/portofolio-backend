import express from 'express';
import connectDB from './db/connect';
require('dotenv').config()

import BlogRoutes from './routes/blog';
import UserRoutes from './routes/user';
import commentRoutes from './routes/comment';

const app = express();

const port = 3001;
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

app.use('/blog', BlogRoutes);
app.use('/user', UserRoutes);
app.use('/comment', commentRoutes);

const start = async () => {
   
    try{
        await connectDB(process.env.MONGO_URL ||'')
        app.listen(port, () => console.log(`Server is listening on port ${port}...`))
    }
    catch (error){
         console.log(error)
    }
}
start()
const init = async () => {
    try{
        await connectDB(process.env.MONGO_URL ||'')
    }
    catch (error){
         console.log(error)
    }
}

export { init };
export default app;
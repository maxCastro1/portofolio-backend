import express from 'express';
import connectDB from './db/connect';
require('dotenv').config()

import BlogRoutes from './routes/blog';
import UserRoutes from './routes/user';
import commentRoutes from './routes/comment';

import swaggerjsdoc from'swagger-jsdoc';
import swaggerUi from'swagger-ui-express';
// import swaggerUi from 'swagger-ui-dist';

export const app = express();
// const swaggerUiAssetPath = swaggerUi.getAbsoluteFSPath();

const port = 3001;
const testPort = 3002;
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
  });

app.use('/blog', BlogRoutes);
app.use('/user', UserRoutes);
app.use('/comment', commentRoutes);

const spacs = swaggerjsdoc({
    swaggerDefinition: {
        openapi: '3.0.0',
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
        info: {
            title: 'Blog API',
            version: '1.0.0',
            description: 'Portofolio Api for backend',
        },
        // host: `localhost:${port}`,
        basePath: '/',
    },
    apis: ['./src/routes/*.ts'],
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spacs));


const start = async () => {
    try{
        await connectDB(process.env.MONGO_URL ||'')
        if (process.env.NODE_ENV !== 'test') {
            app.listen(port, () => console.log(`Server is listening on port ${port}...`));
        }
    }
    catch (error){
         console.log(error)
    }
}
start()
// const init = async () => {
//     try{
//         await connectDB(process.env.MONGO_URL ||'')
//     }
//     catch (error){
//          console.log(error)
//     }
// }

// export { init };
export default app;
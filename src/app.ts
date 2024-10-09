import express from 'express';
import morgan from 'morgan';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import userRouter from './routes/userRoutes';
import documentRouter from './routes/documentRoutes';
import errorHandler from './middlewares/errorMiddleware';
import swaggerUi from 'swagger-ui-express';
import { setupSwagger } from './swagger';

const app = express();

app.use(morgan('tiny'));

app.use(helmet());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);


app.use(express.json());

setupSwagger(app)

app.use(userRouter)
app.use(documentRouter)
app.use(errorHandler.bind(errorHandler))

export default app;
import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import aiRoutes from './routes/ai.routes';
import validateIdea from './routes/validateIdea.routes';

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/validate', validateIdea)

// Health check
app.get('/health', (_, res) => {
  res.status(200).json({ status: 'ok' });
});

export default app;
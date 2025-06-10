import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js'
import appoinRoutes from './routes/appointment.js'
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use('/', authRoutes);
// app.use('/', verifyRoutes);
app.use('/appointment', appoinRoutes)
app.listen(PORT, () => {
  console.log(`CODERED Backend server running on http://localhost:${PORT}`);
});

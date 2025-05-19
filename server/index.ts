import dotenv from 'dotenv';
import app from './app';
import cors from 'cors';

dotenv.config();
const PORT = process.env.BACKEND_PORT || 3001;

app.use(cors({
  origin: process.env.NEXT_PUBLIC_FRONTEND_URL,
  credentials: true,
}));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
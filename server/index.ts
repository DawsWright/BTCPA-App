import app from './app';
import cors from 'cors';
const PORT = process.env.BACKEND_PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use(cors({
  origin: process.env.NEXT_PUBLIC_FRONTEND_URL, 
  credentials: true,
}));
import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes'; // Import tras z folderu routes

dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.PORT || '5000');
const FRONTEND_URL: string = process.env.FRONTEND_URL || 'http://localhost:8081';

app.use(express.json());
app.use(cors({ origin: FRONTEND_URL }));

// Użycie tras
app.use('/api', routes); // <-- To ważne!

// Sprawdzenie działania serwera
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Serwer działa poprawnie!' });
});

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
  console.log('Logowanie uruchomione. Nasłuchuję na porcie:', PORT);
});

import { Router, Request, Response } from 'express';
import pool from '../db'; // Import połączenia do bazy danych

const router = Router();

// Interfejs dla użytkownika
interface User {
  id: number;
  name: string;
}

let users: User[] = [{ id: 1, name: 'Jan' }, { id: 2, name: 'Anna' }];

// GET – Pobierz listę użytkowników
router.get('/users', (req: Request, res: Response): void => {
    res.json(users);
  });
  
// POST – Sprawdź, czy użytkownik istnieje
router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      const result = await pool.query(
        'SELECT * FROM users WHERE email = $1 AND password = $2',
        [email, password]
      );
  
      if (result.rows.length > 0) {
        res.status(200).json({ message: 'Użytkownik zalogowany', user: result.rows[0] });
      } else {
        res.status(401).json({ message: 'Nieprawidłowy email lub hasło' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Błąd serwera' });
    }
  });
  

// PUT – Zaktualizuj użytkownika
router.put('/users/:id', (req: Request<{ id: string }>, res: Response): void => {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId);
  
    if (user) {
      user.name = req.body.name || user.name;
      res.json(user);
    } else {
      res.status(404).json({ message: 'Użytkownik nie znaleziony' });
    }
  });
  
  // DELETE – Usuń użytkownika
  router.delete('/users/:id', (req: Request<{ id: string }>, res: Response): void => {
    const userId = parseInt(req.params.id);
    users = users.filter((u) => u.id !== userId);
    res.json({ message: 'Użytkownik usunięty' });
  });

export default router;

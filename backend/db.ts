import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

console.log('--- Sprawdzanie zmiennych środowiskowych ---');
console.log('PORT:', process.env.PORT);
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('------------------------------------------');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
  ssl: { rejectUnauthorized: false }, // Wymuszenie SSL <- dla poprawnego połączenia z bazą danych 
});


pool.connect()
  .then(() => {
    console.log('✅ Połączono z bazą danych PostgreSQL!');
    return pool.query('SELECT NOW()'); // Zapytanie testowe
  })
  .then((res) => {
    console.log('Czas serwera bazy danych:', res.rows[0].now);
  })
  .catch((err) => {
    console.error('❌ Błąd połączenia z bazą danych:', err.message);
  });

export default pool;

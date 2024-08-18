// src/db.ts
import { Pool } from 'pg';

const pool = new Pool({
  user: 'admin', 
  host: 'db',
  database: 'email_service_db', 
  password: 'example', 
  port: 5432, 
});

export const db = pool;

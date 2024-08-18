// src/types/custom.d.ts

import 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Puedes reemplazar 'any' con un tipo más específico si conoces la estructura del token decodificado
    }
  }
}

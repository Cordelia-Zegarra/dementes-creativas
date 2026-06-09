-- Crear base de datos (solo si no existe, usamos una alternativa)
-- Como el docker-compose ya define POSTGRES_DB, la base ya se crea automáticamente
-- Este script se ejecutará después, así que no necesitamos crear la DB aquí

-- Conectar a la base de datos (opcional, para seeds futuros)
\c dementes_db;

-- Crear extensiones si son necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Mensaje de confirmación
DO $$
BEGIN
    RAISE NOTICE '✅ Base de datos dementes_db inicializada correctamente';
END $$;

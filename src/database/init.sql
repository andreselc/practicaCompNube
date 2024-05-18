-- Crear tabla Directories
CREATE TABLE IF NOT EXISTS directories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Crear tabla Email
CREATE TABLE IF NOT EXISTS email (
    id SERIAL PRIMARY KEY,
    emails VARCHAR(255) NOT NULL,
    directoryId INTEGER,
    CONSTRAINT fk_directory
        FOREIGN KEY(directoryId) 
        REFERENCES directories(id)
        ON DELETE CASCADE
);

-- Crear índices y restricciones adicionales si es necesario
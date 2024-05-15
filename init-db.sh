#!/bin/sh

# Espera a que la base de datos esté lista
echo "Esperando a que la base de datos esté lista..."
sleep 5

# Ejecuta las migraciones de TypeORM
echo "Ejecutando migraciones de TypeORM..."
npm run typeorm migration:run

# Inicia la aplicación
echo "Iniciando la aplicación..."
npm start
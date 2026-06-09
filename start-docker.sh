#!/bin/bash

echo "🐳 Iniciando Dementes Creativas con Docker..."
echo "================================================"

# Construir imágenes
echo "📦 Construyendo imágenes..."
docker build -t dementes-backend ./backend
docker build -t dementes-frontend ./frontend

# Levantar servicios
echo "🚀 Levantando contenedores..."
cd docker
docker-compose up -d

echo ""
echo "✅ ¡Aplicación iniciada!"
echo "📍 Frontend: http://localhost:5173"
echo "📍 Backend: http://localhost:3001"
echo "📍 Base de datos: localhost:5432"
echo ""
echo "Para ver los logs: docker-compose logs -f"
echo "Para detener: docker-compose down"

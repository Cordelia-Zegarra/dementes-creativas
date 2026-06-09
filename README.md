# ⚡ Dementes Creativas - Inventario Mágico de Harry Potter

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18-blue)
![NestJS](https://img.shields.io/badge/NestJS-10-red)
![Tailwind](https://img.shields.io/badge/Tailwind-3-cyan)
![Docker](https://img.shields.io/badge/Docker-✔-blue)
![Kubernetes](https://img.shields.io/badge/Kubernetes-✔-blue)

## ✨ Descripción

Sistema de inventario mágico para **Dementes Creativas**, un emprendimiento de productos temáticos de Harry Potter. 
Permite gestionar productos, generar reportes PDF y visualizar estadísticas con un diseño encantado.

## 🧙‍♂️ Características Mágicas

| Característica | Estado |
|----------------|--------|
| 🔐 Autenticación JWT con validación de contraseña | ✅ |
| 📦 CRUD completo con eliminación lógica | ✅ |
| 📄 Reportes PDF estilo pergamino | ✅ |
| 📊 Gráficos estadísticos interactivos | ✅ |
| 🎨 Diseño glassmorphism temático Harry Potter | ✅ |
| 🦉 Elementos animados (Hedwig, Sombrero Seleccionador) | ✅ |
| 📝 Logs de acceso (IP, navegador, fecha/hora) | ✅ |
| 🐳 Docker | ✅ |
| ☸️ Kubernetes | ✅ |

## 🚀 Tecnologías

### Backend
- **NestJS 10** - Framework Node.js
- **TypeORM** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos
- **JWT + bcrypt** - Autenticación
- **Docker** - Contenedores

### Frontend
- **React 18 + Vite** - Framework UI
- **Tailwind CSS 3** - Estilos
- **Recharts** - Gráficos estadísticos
- **jsPDF** - Reportes PDF
- **Axios** - Cliente HTTP

## 📦 Productos Precargados

27 productos mágicos incluyendo:
- Mapas, Periódicos, Cartas, Revistas
- Libretas, Cuadernos, Álbumes
- Imanes, Tazas Mágicas
- Cuadros, Posters y más...

## 🎯 Instalación

### Requisitos previos
- Node.js 18+
- PostgreSQL (o Docker)
- Docker y Docker Compose (opcional)
- Minikube (para Kubernetes)

### 1. Clonar el repositorio
```bash
git clone https://github.com/Cordelia-Zegarra/dementes-creativas.git
cd dementes-creativas

### 2. Backend
cd backend
npm install
cp .env.example .env  # Configurar variables de entorno
npm run start:dev

### 3. Frontend
cd frontend
npm install
npm run dev

### 4. Base de Datos con Docker
cd docker
docker-compose -f docker-compose.postgres.yml up -d

### 5. Kubernetes
# Iniciar Minikube
minikube start

# Aplicar deployments
kubectl apply -f k8s/postgres-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml

### Autora
Cordelia Zegarra

### Licencia
MIT license

"No todo lo que es oro brilla"


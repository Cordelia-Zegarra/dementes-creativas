FROM node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Exponer puerto de Vite
EXPOSE 5173

# Variables de entorno
ENV HOST=0.0.0.0

# Comando para desarrollo
CMD ["npm", "run", "dev"]

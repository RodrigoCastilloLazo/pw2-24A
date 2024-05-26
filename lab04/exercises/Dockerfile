# Etapa 1: Construir la aplicación Node.js
FROM node:12-alpine3.12 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de la aplicación
COPY . .

# Etapa 2: Configurar Nginx para servir la aplicación Node.js
FROM nginx:1.19.0-alpine AS prod-stage

# Copiar los archivos de la etapa de construcción al directorio de Nginx
COPY --from=build /app /usr/share/nginx/html

# Expone el puerto en el que Nginx estará escuchando
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
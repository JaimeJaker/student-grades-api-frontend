FROM node:18-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
# Usamos un valor temporal para VITE_API_URL durante el build. Se reemplazará en el runtime.
ENV VITE_API_URL=API_URL_PLACEHOLDER
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Script para reemplazar variables de entorno al iniciar el contenedor
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

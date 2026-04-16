#!/bin/sh
set -e

# Reemplazar el placeholder por el valor real de la variable de entorno
find /usr/share/nginx/html -type f -name "*.js" -exec sed -i "s|API_URL_PLACEHOLDER|${VITE_API_URL:-http://localhost:8080}|g" {} +

# Iniciar el comando original de Nginx
exec "$@"

# 🎨 Aplicación Cliente - Gestión Educativa (Frontend)

Esta es la implementación del **Frontend** en formato de Aplicación de Una Sola Página (SPA), diseñada para consumir la API de la Prueba Técnica. Se construyó priorizando un entorno moderno, fuertemente tipado e integrando diseño modular.

---

## 🛠️ Tecnologías Empleadas

- **Librería UI:** React 18
- **Lenguaje:** TypeScript (Para un estricto tipado estático de interfaces y DTOs)
- **Empaquetador (Bundler):** Vite (Proporciona un HMR súper veloz)
- **Cliente HTTP:** Axios
- **Enrutamiento:** React Router DOM (v6)
- **Despliegue:** Nginx (Servidor para estáticos en Docker) y Docker Compose

---

## 📋 Requisitos Previos

Para ejecutar la vista en ambiente aislado, solamente necesitas asegurarte de tener:

- **Docker** y **Docker Compose**
- Asegúrate de tener corriendo previamente la API del Backend para que los clientes HTTP puedan resolverse exitosamente.

---

## 🚀 Guía de Ejecución Rápida (Máximo 10 Comandos)

Levantar la interfaz gráfica contenida es extremadamente sencillo apoyándote del siguiente comando situado en la raíz de este directorio (`frontend`):

1. **Construir y levantar la interfaz de usuario:**
   ```bash
   docker-compose up --build -d
   ```

2. **Verificar que el contenedor levantó:**
   ```bash
   docker-compose ps
   ```

Con estos simples comandos se compilará tu aplicación mediante TypeScript y se copiarán los *assets* generados hacia la imagen ligera web de **Nginx**.

---

## 👁️ Visualización en Vivo

Al finalizar el proceso anterior, entra desde cualquier navegador web a:

👉 **[http://localhost:3000](http://localhost:3000)**

En este portal podrás visualizar y probar las funcionalidades completas:
1. Listas interactivas de **Alumnos**, **Materias** y **Notas**.
2. Formularios asíncronos para el registro.
3. Consumo en vivo y despliegues desde el puerto API (8080).

---

## ⚙️ Variables de Entorno y Configuración (Docker)

Sabemos que la API puede estar en otro dominio en la nube o tener diferentes puertos; para ello no hay rutas rígidamente incrustadas en el código (están expuestas en `docker-compose.yml`):

| Variable | Valor por defecto | Descripción |
|----------|-------------------|-------------|
| `PORT` | `3000` | Puerto en el localhost donde el index web servirá los estáticos. |
| `VITE_API_URL` | `http://localhost:8080` | Puntero a la raíz de la API (Típicamente del backend o un reverse proxy). Carga dinámicamente mediante el Entrypoint generado para Nginx o en fase de construcción. |

*(Opcionalmente, puedes alterar estas variables localmente con un archivo `.env` en la raíz de `frontend`)*.

---

## 🛑 Detener el Ambiente Web

Para parar el servicio de la interfaz web sencillamente ejecuta:
```bash
docker-compose down
```
FROM node:20-alpine AS base
WORKDIR /app
COPY backend/package*.json ./
RUN npm install --production
COPY backend/src ./src
CMD ["node", "src/index.js"]

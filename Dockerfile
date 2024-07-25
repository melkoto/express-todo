# Установка базового образа для сборки
FROM node:22-alpine AS base

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

# Установка образа для разработки
FROM base AS development

ENV NODE_ENV=development
RUN npm install --only=development
CMD ["npm", "run", "dev"]

# Установка образа для продакшена
FROM base AS production

ENV NODE_ENV=production
RUN npm install --only=production
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
CMD ["sh", "-c", "/wait-for-it.sh db:5432 -- npm install --only=development && npm run migrate && npm uninstall sequelize-cli && npm start"]

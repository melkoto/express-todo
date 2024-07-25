FROM node:22-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

ENV NODE_ENV=development

EXPOSE 4000

CMD ["npm", "start"]

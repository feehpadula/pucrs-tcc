FROM node:20-alpine AS build
WORKDIR /server
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 4000

ENTRYPOINT ["node", "index.js"]
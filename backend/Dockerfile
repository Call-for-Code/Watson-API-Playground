FROM node:lts-slim

RUN apt update && apt upgrade -y

WORKDIR /app
COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
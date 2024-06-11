FROM node:18

WORKDIR /app

RUN chmod -R 755 /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env

RUN npm run build

CMD ["npm", "run", "start:dev"]


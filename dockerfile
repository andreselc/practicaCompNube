FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . . 
# ¿Para que si al final no usas la parte de producción?
# RUN npm run build
# CMD [ "npm", "run", "start:dev" ]

FROM node:18

COPY --from=build /app/dist /app

COPY package*.json ./

RUN npm install --production

WORKDIR /app

CMD [ "node", "src/main" ]
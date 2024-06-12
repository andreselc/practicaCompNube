FROM node:18

# Crear grupo y usuario
RUN groupadd appgroup && useradd -ms /bin/bash -g appgroup appuser

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN chmod -R g+w /app \
    && chmod -R g+w /app/dist/db
# RUN chown -R appuser:appgroup /app/dist/db/data-source.d.ts
# RUN chown -R appuser:appgroup /app/dist/*

USER appuser

ENV HOME /app

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

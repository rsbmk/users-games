FROM node:20.10.0-alpine3.18

WORKDIR /app/api

COPY . /app/api

RUN npm install

EXPOSE 3000

# CMD sleep infinity
CMD ["npm", "run", "start:dev"]
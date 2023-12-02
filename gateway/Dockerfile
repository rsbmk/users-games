FROM node:20.10.0-alpine3.18

WORKDIR /app

COPY . /app

RUN apk add --no-cache python3 make g++ \
    && npm install \
    && apk del python3 make g++

RUN npm install

EXPOSE 3000

# CMD sleep infinitys
CMD ["npm", "run", "start:dev"]
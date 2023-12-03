# Gateway - Users/Games API's

## Contenido

- [Introducción](#introducción)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Cómo Usar](#cómo-usar)
- [Endpoints](#endpoints)

## Introducción

En este proyecto se realiza una práctica de microservicios utilizando NodeJs, Redis, MySql y SQL Lite. Se presenta un sistema de gestión de juegos y usuarios, donde tres microservicios independientes se comunican eficientemente a través de un message broker.

El tercer microservicio es un gateway que se encarga de recibir las peticiones de los clientes y redirigirlas a los microservicios correspondientes. Pero sirve como autenticador de usuarios, para que los microservicios de juegos y usuarios no tengan que preocuparse por la autenticación de los usuarios.

Este API Gateway se encarga de validar el token de acceso enviado por el cliente, y si es válido, extrae el id del usuario y lo envía en el header de la petición al microservicio correspondiente.

![Users-Games](./diagram.dio.png)

## Estructura del Proyecto

El proyecto consta de dos microservicios:

1. **Games:**
    - CRUD para poder gestionar los juegos.
    - Base de datos SQL Lite para almacenar información de juegos.

Ejemplo de mensaje enviado por el microservicio de juegos al microservicio de usuarios:

![Games](./game-to-user.message.png)

2. **User:**
    - CURD para poder gestionar los usuarios.
    - Base de datos SQL Lite separada para almacenar información de usuarios.

Ejemplo de mensaje enviado por el microservicio de usuarios al microservicio de juegos:

![Users](./user-to-games.message.png)

La arquitectura del código sigue un enfoque de capas para mantener un código limpio y organizado.

## Cómo Usar
Para inicializar el proyecto solo es necesario tener docker y configurar las `env` en ambos servios.

En el archivo `.env.example` estan las variables de entorno que se deben configurar para cada servicio. Y los valores que deben tener.

```bash
# .env.example
PORT=3000
NODE_ENV=development
DATABASE_URL="file:./dev.db"
REDIS_HOST=redis.users-games.orb.local

```
Una vez configuradas las variables de entorno, se debe renombrar el archivo `.env.example` a `.env` y ejecutar el siguiente comando:

```bash
# Levantar los contenedores
$ docker-compose up -d
```

Con esto, los microservicios estarán disponibles en los siguientes puertos:

- **Users:** http://localhost:3001
- **Games:** http://localhost:3002

## Endpoints
En el archivo `Insomnia_endpoints.json` se encuentran los endpoints disponibles para cada microservicio, listos para importar en Insomnia.
# slash-backend-task

An Order Management System (OMS) for slash e-commerce mobile app.

## Used Technologies
- NestJS as the backend framework
- Prisma as the Object-Relational Mapper (ORM)
- PostgreSQL as the database
- Swagger as the API documentation tool
- TypeScript as the programming language

## Database Diagram
![e-commerce (1)](https://github.com/AhmedHawater2003/slash-backend-task/assets/63217442/d12304bd-3e5a-46be-804f-f3806ee67485)

## Api Documentation Overview
![image](https://github.com/AhmedHawater2003/slash-backend-task/assets/63217442/defcda37-2d35-402c-9ce2-a54e86a87014)

## Setup
### Testing environment
To be able to test the project you will need to have the following:
- [Node.js](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs) installed.
- Postgres running instance (either by installing Postgres locally and running it through PgAdmin4 or by using [a Docker image](https://www.prisma.io/blog/nestjs-prisma-rest-api-7D056s1BmOL0#create-a-postgresql-instance))

> [!NOTE]  
> In this project, the `DATABASE_URL` required for Prisma to connect to the Postgres instance is `postgresql://postgres:178196@localhost:5432/postgres` following form `postgresql://user-name:password@localhost:port-number/database-name`
>
> If your instance has any different configurations, please change the `DATABASE_URL` from the project [.env file](./.env)

### Setup Commands
1. Clone the repository:
   ```bash
   git clone https://github.com/AhmedHawater2003/slash-backend-task
   ```
2. Navigate to the cloned directory:
   ```bash
   cd slash-backend-task
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the PostgreSQL database with Docker (Optional):
   ```bash
   docker-compose up -d
   ```
5. Make sure that the database instance is listening on the chosen port (5432 is the default):
   - For Linux and Max
       ```bash
       netstat -a | grep ':5432'
       ```
   - For Windows
       ```bash
       netstat -an | findstr ":5432.*LISTENING"
       ```
   In both cases, you should get an output similar to the following:
     ```bash
     TCP    0.0.0.0:5432           0.0.0.0:0              LISTENING
     ```
6. Apply database migrations, generate Prisma Client and seed the database:
   ```bash
   npx prisma migrate dev
   ```
7. Start the project:
   ```bash
   npm run start:dev
   ```
Now, you should be able to access the API documentation at [http://localhost:3000/api/](http://localhost:3000/api/).   




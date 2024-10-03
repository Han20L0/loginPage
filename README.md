# Login Page API Documentation

### Description
API for Registration, Login, Get all Profile, Get Profile based on Token

---

### Getting Started

To get started with the Login Page API, Follow these Steps

1.  Clone the repository `git clone `
2.  Install dependencies using `npm i pg express ejs nodemon cloudinary multer jsonwebtoken dotenv cors bcrypt`.
3.  Set up the database by running migrations with `npx sequelize-cli db:migrate`.
4.  Start the server with `nodemon app`.
5.  Explore the API endpoints detailed below

---

### Endpoint List :

- `POST /register`
- `POST /login`
- `GET /profile/all`
- `GET /profile/token`

---

### Pagination, Sorting, Filtering

#### Pagination 

params :  `limit` The amount of data to display, e.g. `5`.

`GET /query?limit=5`

params :  `page` The page you want to access, e.g. `2`.

`GET /query?page=2`

##### Combination

`GET /query?page=2&limit=5`

#### Sorting 


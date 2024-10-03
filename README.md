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

Combination :

`GET /query?page=2&limit=5`

#### Sorting 

params : `sortBy` retrieving data by sorting based on certain columns.

`GET /query?sortBy=username`

Params : `sortOrder` retrieving data by sorting based on their order.

`GET /query?sortOrder=ASC`

Combination 

`GET /query?sortBy=username&sortOrder=DESC`

#### Filtering

params : An example of retrieving data with filtering, for example based on `username` or `role`.

`GET /query?username=john&role=admin`

#### Combination of all 

`GET /query?page=1&limit=5&sortBy=username&sortOrder=ASC&username=john&role=admin`

---

### Endpoint List :

#### POST /register

Register new User for User authentication.

> body:

Request:

```json
{
    "username": "example",
    "password": "Example12345"
}
OR
{
    "username": "example",
    "password": "Example12345",
    "role":"admin"
}
```

Success Response:

> Response: (201 - Created)

```json
{
    "message": "Registration successful",
    "username": "example"
    "role":"user"
}
OR
{
    "message": "Registration successful",
    "username": "example"
    "role":"admin"
}
```

Error Response:

> Response: (400 - Bad Request)

```json
{
    "message": "Username already exists"
}
OR
{
    "message": "Password must be between 8 and 50 characters long"
}
```

#### POST /login

User authentication.

> body:

Request:

```json
{
  "username": "example",
  "password": "Example12345"
}
```

Success Response:

> Response: (200 - OK)

```json
{
    "message": "Login successful",
    "token": "example_token",
    "user": {
        "id": 1,
        "username": "example"
    },
    "decodedToken": {
        "id": 1,
        "username": "example",
        "iat": 1727925071,
        "exp": 1727928671
    }
}
```

Error Response:

> Response: (401 - Unauthorized)

```json
{
    "message": "Invalid User"
}
```

#### GET /profile/all

Get all profile data

> Headers:
> Authorization: Bearer token

Request:

```json
{
  "accessToken":"example_token"
}
```

Success Response:

> Response: (200 - OK)

- If Don't have any data
  
```json
{}
```

- If have data

```json
{
    "message": "Users retrieved successfully",
    "users": [
        {
            "id": 1,
            "username": "admin",
            "role": "admin"
        },
        {
            "id": 2,
            "username": "hanan",
            "role": "user"
        },
        {
            "id": 3,
            "username": "riska",
            "role": "user"
        },
        {
            "id": 4,
            "username": "Kenta",
            "role": "user"
        },
        {
            "id": 5,
            "username": "Joi",
            "role": "user"
        },
    ]
}
```

#### GET /profile/token

Retrieve the authenticated user's profile information.

> Headers:
> Authorization : Bearer <accessToken>

Request:

No request body is needed as the user ID is derived from the provided `accessToken` in the header.

Success Response:

> Response: (200 - OK)

```json
{
    "id": 1,
    "username": "example",
    "role": "admin",
    "message": "User profile fetched successfully"
}
```

Error Response:

> Response: (404 - Not Found)

```json
{
    "message": "User not found"
}
```

> Response: (401 - Unauthorized)

```json
{
    "message": "No token provided"
}
OR
{
    "message": "Invalid or expired token"
}
```

---

### Dependencies

The project uses the following dependencies:

- Express
- Sequelize
- Bcrypt
- Jsonwebtoken
- Pg
- Body-parser
- Cors
- Dotenv
- Ejs
- Multer
- Multer-storage-cloudinary
- Nodemon

Install them using `npm install`.

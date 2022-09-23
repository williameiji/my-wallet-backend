# <p align = "center"> My-Wallet Backend </p>

Check project frontend [here](https://github.com/williameiji/my-wallet-frontend)

## :clipboard: Descrição

Sing me a song is an application for anonymous song recommendation. The more people like a recommendation, the more likely it is to be recommended to others.

---

## :computer: Technologies and Concepts

- REST APIs
- Node.js
- JavaScript
- MongoDB
- Joi
- JsonWebToken
- BCrypt
- Nodemon

---

## :rocket: Routes

```yml
POST /signup
    - Route to register a new user
    - headers: {}
    - body: {
        "name": "Lorem Ipsum",
        "email": "Larue_Rau85@yahoo.com",
        "password": "89G1wJuBLbGziIs",
        "isPasswordEqual": "89G1wJuBLbGziIs"
    }
```

```yml
POST /login
    - Route to login
    - headers: {}
    - body: {
        "email": "Larue_Rau85@yahoo.com",
        "password": "89G1wJuBLbGziIs"
    }
```

```yml
POST /history (authenticated)
    - Route to add a new history
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "value": "1234",
        "description": "Voluptatem repellat consequatur deleniti qui quibusdam harum cumque.",
        "type": "input" | "output",
    }
```

```yml
GET /history (authenticated)
    - Route to list all history
    - headers: { "Authorization": "Bearer $token" }
```

```yml
DELETE /history/:id (authenticated)
    - Route to delete a history
    - headers: { "Authorization": "Bearer $token" }
```

```yml
PUT /history/:id (authenticated)
    - Route to edit a history
    - headers: { "Authorization": "Bearer $token" }
```

## 🏁 Running the application

This project was started with the [Express](https://www.npmjs.com/package/express), so make sure you have the latest stable version of [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/) running locally.

First, clone this repository on your machine:

```
git clone https://github.com/williameiji/my-wallet-backend
```

Then, inside the folder, run the following command to install the dependencies.

```
npm install
```

Finished the process, just start the server

```
npm start
```



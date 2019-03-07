# OAuth-Node
Implementation of OAuth 2.0 in node.js using Sequelize.js

## Specification
 - Node.js v8.x or latest
 - Sequelize v4.x
 - Oauth2-Server v3.x

## Docs
 - [Sequelize](https://sequelize.readthedocs.io/en/v3/)
 - [Oauth2-Server](https://oauth2-server.readthedocs.io/en/latest/)

## Steps
 - [Environment setup](#environment-setup)
 - [Database setup](#database-setup)
 - [Start Application](#start-application)
 - [Swagger](#swagger)

### Environment setup
Install node modules
```sh
$ npm install
```

### Database setup
Create a sample database with name as `oauth-dev` with
username as `postgres` and
password as `root`
You can change these configurations in `config/config.json`

#### Database Migration
```sh
$ npm run migrate
```
#### Seeding Sample data
```sh
$ npm run seed
```

### Start Application
Application will run at `http:localhost:3000`

#### Run in development mode
Starts `app.js` with `nodemon`
```sh
$ npm start
```
#### Run in production mode
Sets `NODE_ENV` as `production` and Starts `app.js`
```sh
$ npm run production
```

### Swagger
Check Swagger Docs at `http:localhost:300/docs`

#### Credentials
 - Client ID = `11814a7e-53fd-49db-b9e5-69a4370b5827`
 - Client Secret = `demo_client_secret`
#### Users
 - Admin = `demo_admin@sequelize.com`, `demoadmin@123`
 - User = `demo_user@sequelize.com`, `demouser@123`

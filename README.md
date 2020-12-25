# AngularJS, ExpressJS, Node.js, and MongoDB

A very basic todo app example using MEAN stack application.

The full stack application separates the Node.js, ExpressJS and MongoDB Server into the back-end and leaves AngularJS, HTML, and CSS as the front-end that requests data from the back-end.

## Prerequisites

- Node.js
- Node Package Manager
- MongoDB Cloud

### Directory layout

    .
    ├── api                   # Nodejs API files
    ├── assets                # Images, css, and js will be here
       ├── css
       ├── js
    ├── views                 # AngularJS ejs files
    ├── app.js                # App entry point
    └── README.md

## Installation & Configuration

Certain configuration in both the application and the database must be done before this project is usable.

### Application

Checkout the latest master branch from GitHub and navigate into it using your Terminal or Command Prompt (Windows). Assuming you already have Node.js installed, run the following:

```
npm install
```

This will install all dependencies as defined in the **package.json** file.

### Database

This project requires MongoDB Cloud.

Setup mongodb cloud https://docs.atlas.mongodb.com/getting-started and copy connection string

## Setting up mongodb configuration

- Copy .env-example and rename it to .env

### For testing account

```
DB_USERNAME=mayuku
DB_PASSWORD=lZhSMIfhN2RV1hce
DB_NAME=todos
```

## Run Local

With all dependencies installed and mongodb cloud up and running.

```
npm start
```

Now when you visit **http://localhost:3000** from your web browser you will be able to use the application.

## Resources

MongoDB Cloud - [https://www.mongodb.com/cloud](https://www.mongodb.com/cloud)

ExpressJS - [http://www.expressjs.com](http://www.expressjs.com)

AngularJS - [http://www.angularjs.org](http://www.angularjs.org)

Node.js - [http://www.nodejs.org](http://www.nodejs.org)

# FSD Mystore Angular Frontend  

This README constitutes an important part of the Full Stack Developer Nanondegree, this project focuses on the creation of a frontend website store. The entire project was written in the web framework Angular, using the Angular CLI ver 11.1.4, Angular 11.1.2 and Node 12.13.1


## Introduction/App functionality

This Angular app provides a simple demonstration of a shopping cart connected to a RESTful API backend. 

Once installed and functional the app can perform the following functions

* Login/Register unique users
* Show all completed & current orders for logged-in users
* Show items in completed/current orders
* Maintain a persistant cart (API Based)
* Adds items to a cart (API Based)
* Removes items from a cart (API Based)
* Streamlined Checkout Process
* About page summarises top selling products/technologies used
* Get and store a JSON Web Token (JWT) locally after appropriate authorisation

    The JWT stores:
    * Expiry date
    * Username
    * User ID (API User ID)
    * Secure Token (API created)

    These JWT items are used for
    * Identification 
    * Authorisation
    * Validating API requests (user-specific routes, e.g. users orders/cart content/etc)

## Notes on the Integration of the Backend API

Part of the extended requirements for submission are to interface the frontend Angular store to a backend API. **This has been implemented** in this submission with a modified version of the previous [Full Stack Developer Backend API project](https://github.com/udacity-tom/FSD_MyStore_Backend_API).
The following documentation for installation and setup requires the use of the backend. What needs to be done in order that the backend is available for the frontend will be described below.

## Installation Notes
Because this project interfaces to the backend API and utilises the cart functionality defined in the previous project both 'Frontend'-the Angular app and the 'Backend'-the node API are included in this repository. 

The backend is located in this repository as a subtree - the simplest, but also effective, method of referencing a seperate project within a single repository. ([Github Subtree Help page](https://docs.github.com/en/get-started/using-git/about-git-subtree-merges))

What this means is:
To use this application, there are additional steps involved.
To run the front end project, the backend will need to be installed first.
In the following sections we describe what is required.  
## Environment Setup & Installation Method

To start the process, clone the repository and make sure node (min. v12.13.1) and npm are installed in the local dev environment.

---
<u>Steps to Install the Backend & the Frontend</u>

---
1. Clone the repository

   ```
   git clone https://github.com/udacity-tom/FSD_MyStore_Frontend.git
   ```
2. Setup PostgresSQL
   * Setup PostgresSQL ([PostGresSQL Home Page ](https://www.postgresql.org/)) on your local dev environment
   * Create your `postgres` environmental variables in its own `.env` with the following: 
   ```
   POSTGRES_HOST=127.0.0.1
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=password
   ```
   NOTE: where necessary substitute your own Postgres environmental variables.
   * Once set, start an instance of Postgres on port 5432. 
   (In our local environment we used the given `docker-compose.yml` to setup the Postgres database.)
   * Create the necessary Databases by accessing the psql prompt of the Postgres instance.
   ```
   CREATE DATABASE mystore;
   CREATE USER storefront_admin WITH PASSWORD 'password';
   GRANT ALL PRIVILEGES ON DATABASE mystore TO storefront_admin;
   ```
   NOTE: The original, modified README.md from the Backend Project provides additional information regarding the Backend API, its function, features and implementation, although it should not be necessary for the continuing installation of the Frontend [More Details in the Backend README](Backend/README.md)
3. Create the environmental variables for 
   * the Backend API
   * the Frontend Angular App

   3.1 Create the Backend API '.env' in the `Backend` subdirectory of the cloned repository.

      Use the following and/or subsitute your relevant system configuration variables: 
      ```
            POSTGRES_HOST=127.0.0.1
            POSTGRES_DB=mystore
            POSTGRES_USER_DEV=storefront_admin
            POSTGRES_PASSWORD_DEV=password
            
            POSTGRES_TEST_DB=mystore_test
            POSTGRES_USER_TEST=storefront_admin
            POSTGRES_PASSWORD_TEST=password
            
            POSTGRES_USER=postgres
            POSTGRES_PASSWORD=password
            
            ENV=test

            BCRYPT_PASSWORD=go-and-take-five-times-orange
            SALT_ROUNDS=10
            TOKEN_SECRET=Carny-LON*gorange

            SERVER_PORT=3002
            SERVER_ADDRESS=127.0.0.1
      ```
   3.2 Create the Frontend environmenta variables in the `root` of the cloned project directory.
      
      Edit the file `/src/enviroments/enviroment.ts` in an editor and paste, then save the follwing information into the file: 

   ```
   export const environment = {
   production: false,
   API_SERVER_IP: '127.0.0.1',
   API_PORT: '3002',
   PROTOCOL: 'http://',
   };
   ```

4. Install the dependencies and test data. Once the environmental variables are set, we can install the dependencies and test data using the following command from the `root` of the cloned project directory.
   Use
   ```
   npm run install-app
   ````
   This script will install the dependencies for the frontend and backend, create a `mystore_test` database, set up the required tables and populate said tables with test data.

5. Finally in another terminal window, in the root directory of the cloned project directory enter
   ```
   ng serve
   ```
   This will launch the angular app. Note the given URL in the terminal output.

### Accessing the Frontend App

Once the backend and the frontend servers are running 

* open a browser to the default path shown by `ng serve` once the app has been compiled and served.
    * usually https://localhost:4200
    * or https://127.0.0.1:4200

### Accessing the Backend API
Assuming that you have used the default suggestions for the `.env` enviromental variables, the API on the backend can be accessed by opening a browser window to:<br>
`http://127.0.01:3002`

Alternatively to call the API interactively, with the provided test data, use software similar to [Postman](https://www.postman.com/), point Postman to `http://127.0.0.1:3002`


## Technical Notes - Implementation Functionality

Utilising various Angular technologies: 

* Component based structure/architecture
* Child/Parent hierarchy
* Relationships between Child & Parents use directives and decorators-where necessary
* Utilises Angulars property & event binding
* Services are used for communications between unrelated components
* Observables are used for services


## Technologies Used - Frontend
- Angular Framework ver. 11.1.2
- Angular Bootstrap (ngBootstrap)
- Angular CLI, Router, Forms, env vars
- Typescript throughout the app
- Single Page Application Architecture (SPA)
- Reactive programming RxJS
- Observable file retrieval/updates
    - Unsplash for dynamic image retrieval

## Technologies Used - Backend

- Node (asynchronous endpoints for API access)
- Express (for creating endpoints, routing, and serving files)
- TypeScript throughout the API
- Javascript (async, express, middleware, etc in a modular design)
- Jasmine (for JS testing)
- Jason Web Token (JWT) for stateless interaction
- Basic Error handling
- Misc. middleware, checking username, handling authentication



## About Udacity's Full Stack Javascript Developer Nanodegree

Students who graduate from the program will be able to:  
* Build client-side experiences and applications using Angular, collecting data from users and from
backends, providing rich user interactions and organizing code and data.
* Build server-side executed code with TypeScript and integrate with 3rd party code such as
Angular’s Server Side Rendering.
* Leverage Express.js to architect and build APIs that power dynamic functionality and to generate
and supply data to web and mobile clients.
* Persist data to a database, query and retrieve data, and pass this data all the way through to
various client devices.

 [Udacity Full Stack Javascript Developer Nanodegree](https://www.udacity.com/course/full-stack-javascript-developer-nanodegree--nd0067)
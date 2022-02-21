# FSD Mystore Angular Frontend  

Part of the Full Stack Developer Nanondegree, this project focuses on the creation of a frontend website store. The entire project was written in the web framework Angular, using the angular CLI ver 11.1.4 and Node 12.13.1


## Introduction/App functionality

This angular app provides a simple demonstration of a shopping cart connected to a RESTful API backend. 

Once installed and functional the app can perform the following functions

* Register unique users
* Show all completed orders
* Show items in completed orders
* Maintain a persistant cart
* Adds items to a cart
* Removes items from a cart
* 
* Get and store a JSON Web Token (JWT) after appropriate authorisation
    The JWT stores
    * Expiry date
    * Username
    * User ID (backend ID)
    * Secure Token (backend issued)
    These details are used for
    * Identification 
    * Authorisation
    * Validating API requests


## Technical Notes

Utilising various angular technologies: 

* Component based structure
* Child/Parent hierarchy
* Relationships between Child & Parents are directive based using decorators
* A recommended component based architecture has been used
* Services are used for communications between unrelated components
* Directives are used to implement communication between Child & Parent Components
* Observables are used throughtout for service based modules
* 

### Note on Backend API

Part of the extended requirements for submission was to interface the frontend Angular store to a backend API. This has been implemented in this submission with a modified version of the previous project.

The following documentation for installation and setup requires the use of the backend. What needs to be done in order that the backend is available for the front end will be described below.

## Installation, Environment Setup

To start the process, clone the repository and make sure node (v12.13.1) and npm are installed in the local dev environment.




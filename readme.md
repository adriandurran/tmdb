# Training & Qualifications Manager

### Application Overview

This application is designed to track users (employee's) training, courses, competencies, roles and their movements throughout the business.
The application has a 'traffic light' system that will show when an employee's courses or competencies may be out of date and will need to be renewed.
The application can give an employee view as well as allow business owners or department managers to get a high level view of their business/department's health.
This is particularly important if for certain roles/jobs where the person needs to be suitably qualified and in date.

In its simplest form the heirachy works as follows:
Courses -> Competencies -> Roles

1.  An user/employee will enter the courses he has completed (verified by a manager).
2.  One (or many) Courses will make up a Competency (One to many relationship).
3.  One (or many) Competencies will make up a Role.

The application has 3 access levels.

1.  Super Admin
2.  Admin/Manager
3.  User/employee

A user registers on the application and can be approved by an Admin/Manager. Only a Super Admin can promote a User/Employee to the Admin/Manager level.

There are various other levels/abilities for the Admin/Manager **more information to be added here**

### Application Architecture

The application is a typical client/server architecture based on Reactjs, Nodejs and MongoDB.
During _development_ the application (server -> Nodejs & database -> MongoDB) can be run in Docker using the Docker-Compose file. The client application needs to be started seperately using Yarn (`yarn start`).
In _production_ the client & server can be built using the Docker file.

In _development_ there is the possibility to install mock data and there are api's provided for this purpose.

There is a `server.env` file with environment variables (listed later). You will need to provide your own values for this.

On first install the server will _seed_ the database with 2 accounts (Super Admin & Super IT Admin). Both have the same rights with the exception that the IT Admin account can add version numbers etc...
It will take the information from the `server.env` file.

For user/employee photos the application is using [Cloudinary](https://cloudinary.com) to store and retrieve photos. This was just a simple use case but there is also code logic to save the photos to the database. If you continue to use Cloudinary you will need to create an account.

### Installation

Either copy or clone the repo.
You will need to have [Docker](https://docs.docker.com/install) (CE) running on your device.
The `Dockerfile` in the root directory is used to build a Docker image.

#### Client

In a terminal window navigate to the `client` folder and do a `yarn install`. To start the client part of the application: `yarn start`.

#### Server

In a terminal window navigate to the `server` folder. Run `yarn install`.
In a terminal window navigate to the root of the directory and type: `docker-compose up --build`.
You will only need to use this command on first running of the application. For subsequent starts use `docker-compose up` & `docker-compose down` to start and stop the apppication. You can also use `docker-compose start`, `docker-compose stop`.

You will need to create a file called `server.env` in the `server` folder (or change the `docker-compose.yml` to reflect your env file). **Ensure** that this file is part of your `.gitignore`.
You will need the following environment variables in the `server.env` file. The values are of course up to you.

```
MONGODB_URI=mongodb://tmdb_db:27017/tmdb_db_demo
COOKIE_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
SEEDADMIN_ID=
SEEDADMIN_FN=
SEEDADMIN_LN=Admin
SEEDADMIN_UN=
SEEDADMIN_VERIFIED=true
SEEDADMIN_ISADMIN=true
SEEDADMIN_ISSUPER=true
SEEDADMIN_PWD=
SEEDADMIN_IT_ID=
SEEDADMIN_IT_FN=
SEEDADMIN_IT_LN=
SEEDADMIN_IT_UN=
SEEDADMIN_IT_VERIFIED=true
SEEDADMIN_IT_ISADMIN=true
SEEDADMIN_IT_ISSUPER=true
SEEDADMIN_IT_PWD=
```

The `MONGODB_URI` is for local Docker installs, you will need to change this value for cloud/internet installs.

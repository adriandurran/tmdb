# Training Management Application

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

On first install you will need to _seed_ the database with 2 accounts (Super Admin & Super IT Admin). Both have the same rights with the exception that the IT Admin account can add version numbers etc...

> **It is extremely important that if you install this application on the internet you change the passwords for these accounts.**

### Installation

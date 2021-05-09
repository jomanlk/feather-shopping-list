# Rapid Prototyping with FeathersJS and Docker

This is a companion repository for the guide that is available here : https://randomcoding.com/2021/05/09/rapid-prototyping-with-feathersjs-and-docker/

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [Docker](https://www.docker.com/) [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/feather-shopping-list
    npm install
    ```
3. Start the database server
   ```
   npm run db-init
   npm run db-start
   ```
4. Create a database named `shopping_list_db1` and then run the following code
    ```
    DROP TABLE IF EXISTS items;
    CREATE TABLE `items` (
      `id` INT NOT NULL AUTO_INCREMENT,
      `item` VARCHAR(255) NOT NULL,
      `quantity` VARCHAR(30) NOT NULL,
      `createdAt` DATETIME NOT NULL,
      `updatedAt` DATETIME NOT NULL,
      PRIMARY KEY (`id`)
    )
    COLLATE='utf8mb4_0900_ai_ci'
    ENGINE=InnoDB;
    ```
 
6. Start your app

    ```
    npm start
    ```


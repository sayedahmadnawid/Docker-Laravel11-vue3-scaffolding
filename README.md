# Docker-Laravel11-vue3-scaffolding
This repository provides a scaffold designed with best practices in mind, utilizing Laravel 11, Vue 3, Tailwind, and several other modern technologies. The goal is to create a foundation that leverages composables and reusable components to enhance development efficiency and maintainability.

## Technologies Used
__Laravel 11:__ A robust PHP framework for building web applications with an elegant syntax.

__Vue 3:__ A progressive JavaScript framework for building user interfaces.

__Tailwind CSS:__ A utility-first CSS framework for rapid UI development.

__Sanctum:__ Laravel's lightweight authentication system for SPAs and simple API token usage.

__i18n:__ Internationalization support to build multilingual applications.

__Vuex:__ State management pattern + library for Vue.js applications.

__Reusable Components:__ Modular components to promote reuse and consistency across the application.

## Purpose 
The purpose of this package is to scaffold a best practice design using composables and reusable components. This setup aims to streamline the development process and ensure that the codebase remains clean, maintainable, and scalable.

## Features

__Efficient State Management:__ Leverage Vuex for centralized state management.

__Authentication:__ Implement authentication seamlessly with Laravel Sanctum.

__Responsive Design:__ Utilize Tailwind CSS for a fully responsive design.

__Multilingual Support:__ Easily support multiple languages with i18n.

__Component Reusability:__ Write reusable Vue components to avoid code duplication and enhance consistency.

__Composables:__ Utilize Vue 3 composables to share reusable logic.

## Install
Clone the git repository on your computer

`$ git clone git@github.com:sayedahmadnawid/laravel11-vue3-vite-scaffolding.git`

Move inside the application root directory. 

`$ cd laravel11-vue3-vite-scaffolding`

`$ composer install`


## Setup
When you are done with installation, copy the .env.example file to .env

`$ cp .env.example .env`

Generate the application key

`$ php artisan key:generate`

Add your database credentials to the necessary env fields

Migrate the application

`$ php artisan migrate`

`$ php artisan db:seed`

Install node modules

`$ npm install`

## Run the Application
Open two tabs inside the application root directory.

In the first tab run:

`$ php artisan serve`

In the second tab run:

`$ npm run dev`

Browse the application 

`localhost:8000`

## Docker Installation Guide
Follow these steps to set up and run the application using Docker:

#### Step 1: Build the Docker Containers

`$ docker-compose build`

### Step 2: Start the Docker Containers

`$ docker-compose up -d`

### Step 3: Handle Node Installation Issue
If Node.js was not installed correctly, run the following command to build the Node container separately:

`$ docker build -t my-laravel-node .`

## step 4: Copy Environment Configuration
Copy the example environment configuration to create your own environment file:

`$ cp .env.example .env`

### Step 5: Install Laravel Packages
Access the Laravel application container and install the necessary PHP packages:

`$ docker exec -it my-laravel-app bash`

Inside the container, run the following commands:

`$ composer install`
`$ php artisan migrate`
`$ php artisan db:seed`

## Step 6: Install Node Packages
Access the Node container and install the necessary Node.js packages:

`docker exec -it my-laravel-node bash` 

Inside the container, run the following command:

`npm install`

## Step 7: Access the Application
Open your web browser and go to:

http://localhost:8000

## Contributing
Contributions are welcome! Feel free to create a pull request.

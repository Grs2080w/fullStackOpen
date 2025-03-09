# Rate Repository App

## Overview

The Rate Repository App is a web application that allows users to rate and review repositories. It provides a user-friendly interface for browsing, rating, and reviewing repositories, as well as viewing ratings and reviews from other users.

This Aplication has made in React Native and Expo.

## Features

- Browse repositories
- Rate repositories
- Write and read reviews
- User authentication and authorization

## Getting Started

Install the dependencies:

      npm i

## Configuration

Before running the application, you need to configure the environment variables. The project includes a ``.env.template`` file that lists all the required environment variables.

1. Create a .env file in the root directory of the project.
2. Copy the contents of .env.template to .env.
3. Customize the values in the .env file according to your environment.


## Running the Application
To start the application, run the following command:
      
      npm start

This will start the development server and open the application in your default web browser.

## Running Tests
To run the tests, use the following command:

      npm test

This will execute the test suite and display the results in the terminal.

### Folder Structure
- ``src``/: Contains the source code of the application.
  - ``components``/: React components.
  - ``context``/: React context for managing global state.
  - ``hooks``/: Custom hooks for reusable logic.
  - ``utils``/: Utility functions and classes.
- ``public``/: Public assets such as images and the HTML template.
- ``tests``/: Test files for the application.

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v18 or higher)
- npm (v10 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Grs2080w/rate-repository-app.git
   cd rate-repository-app
## Project description
The task was to build a frontend delivery fee calculator app using React and TypeScript. A delivery fee is calculated based on user input and is shown to the user. Full description [here](https://github.com/woltapp/engineering-summer-intern-2023/blob/main/README.md).

## How to start the application

### 1. Clone the repository to your local machine
- Prerequisites:
  - `git`
- Clone the repository in terminal with `git clone https://github.com/joelhackinen/deliveryfee.git`

Now there are two different ways to proceed from here:
#### Using docker-compose
- Prerequisities:
  - `Docker` (v20.10.22, older ones might work too)
  - `docker-compose` (v2.15.1, older ones might work too)
- At the root of the project run terminal command `docker-compose up -d` to build and run the production image as a container in the background. The app will be running at `localhost:8000`.
- You can also run it in development mode with `docker-compose -f docker-compose.dev.yml up -d` with hot reloading enabled. The app is running at `localhost:3000`.
- Stop the container with `docker-compose down`.

#### OR using npm
- Prerequisities:
  - `NodeJS` (preferably v18.13.0, older ones might work too)
  - `npm` and `npx` (both v8.19.3, older ones might work too)
- Run `npm install` at the root of the project to install all the dependencies.
- Use command `npm start` to run the application.
- The app is running at `localhost:3000`.

### 2. Pull the image from Docker Hub and run as a local container
- Prerequisities:
  - `Docker` (v20.10.22, older ones might work too)
- The latest image is automatically updated to Docker Hub through a simple GitHub Actions pipeline.
- Run with `docker run -p 8000:80 joelhackinen/deliveryfee:latest`.
- The app is running at `localhost:8000`.

## Tests
`npm run test` to start the tests.

## Technology choices
- React
  - requirement
- TypeScript
  - requirement
- React-Bootstrap
  - simple UI-framework which hardly requires any boilerplate code
  - keeps the code maintainable and readable and provides all the necessary tools to make clear and responsive interfaces
- Docker and docker-compose
  - facilitates application development and deployment
  - makes the reviewing of the project easier
- Jest and react-testing-library
  - simple testing frameworks for testing functions and components
- GitHub Actions
  - facilitates the CI/CD pipeline

As the application state needs to be accessed only from the depth of two component layers (picture below), the use of any global state management tools is not justified. All the necessary stage management is handled with React's built-in useState-hook and the information between the components is passed as props.

![uml](./images/componentuml.PNG)



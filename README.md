## How to start the application

### 1. Clone the repository to you local machine
- Clone the repository with `git clone https://github.com/joelhackinen/deliveryfee.git`
Now there are two different ways to proceed from here:
#### A. Using docker-compose
- At the root of the project run terminal command `docker-compose up -d` to build the image and run it as a container in the background.
- You can also run it in development mode with `docker-compose -f docker-compose.dev.yml up`. Hot reloading is enabled in development mode.
- The app is running at `localhost:8000`.
This method requires you to have Docker installed in your own machine.
#### B. Using npm
- Run `npm install` at the root of the project to install all the dependencies.
- Use command `npm start` to run the application.
- The app is running at `localhost:3000`
This method requires you to have Node version 16 or newer installd in your machine.

### 2. Pull the image from Docker Hub and run as a container
- The latest image is automatically updated through GitHub Actions CI pipelines
- Find and pull the image from [here](https://hub.docker.com/r/joelhackinen/deliveryfee)
- Run with `docker run --publish 8000:80 {image_id}` (`docker image ls` to find out the image_id)
- The app is running at `localhost:8000`

This method requires you to have Docker installed in your own machine.
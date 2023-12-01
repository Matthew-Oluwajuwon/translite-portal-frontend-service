# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install -g npm@9.6.0 --legacy-peer-deps
RUN npm install react-scripts --force

# Copy the application code to the working directory
COPY . .

# Build the Vite.js app for production
RUN npm run build

EXPOSE 8002

# Command to start your app
CMD [ "npm", "start" ]
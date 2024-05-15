# Use the official Node.js image as a base
FROM node:17-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install sqlite3
RUN npm install && npm install sqlite3 --save

# Install nest CLI
RUN npm install --save-dev @nestjs/cli

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/src/main"]
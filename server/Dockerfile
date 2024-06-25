# Use the official Node.js image.
FROM node:latest

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install dependencies.
COPY package*.json ./
RUN npm install

# Copy the rest of the application code.
COPY . .

# Expose the application port.
EXPOSE 4000

# Start the application.
CMD ["npm", "start"]
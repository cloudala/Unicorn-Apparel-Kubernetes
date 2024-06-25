# Use the official Node.js image.
FROM node:latest

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy package files and remove node_modules and package-lock.json if they exist
COPY package*.json ./
RUN rm -rf node_modules package-lock.json && npm install

# Copy the rest of the application code.
COPY . .

# Build the application.
RUN npm run build

# Install serve to serve the build
RUN npm install -g serve

# Expose the application port.
EXPOSE 3000

# Start the application.
CMD ["serve", "-s", "dist"]
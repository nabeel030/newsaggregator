FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Fix potential permission issues
RUN chown -R node:node /app

# Use the node user from the base image for better security
USER node

# Expose port for the React app
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]

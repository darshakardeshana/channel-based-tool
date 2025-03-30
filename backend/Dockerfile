# backend/Dockerfile
FROM node:16

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Expose port 5000 (backend server port)
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]

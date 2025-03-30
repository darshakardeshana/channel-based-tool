FROM node:16

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 3000 (default port for Create React App)
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]
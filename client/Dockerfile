# Frontend Dockerfile (for production)
FROM node:18

# Set working directory
WORKDIR /client

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all files and build the React app
COPY . .
RUN npm run build

# Install a static server to serve the build folder
RUN npm install -g serve

# Use "serve" to run the production build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]

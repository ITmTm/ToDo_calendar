# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Use an official Nginx image to serve the build
FROM nginx:alpine

# Copy the build files to the Nginx directory
COPY --from=0 /app/build /usr/share/nginx/html

# Expose the port that Nginx will run on
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
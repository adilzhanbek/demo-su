# Stage 1: Build the React application3
FROM node:16 as build-stage

WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . /app/
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx and keep the process from backgrounding and the container from quitting
CMD ["nginx", "-g", "daemon off;"]

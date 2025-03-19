################################
#### BUILD ENVIRONMENT ####
################################

FROM node:20-alpine3.20 AS build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Accept build arguments
ARG VITE_BACKEND_URL
ARG VITE_ADMINSERVICE_URL
ARG VITE_DOCTORSERVICE_URL

# Make them available inside the container
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_ADMINSERVICE_URL=$VITE_ADMINSERVICE_URL
ENV VITE_DOCTORSERVICE_URL=$VITE_DOCTORSERVICE_URL

# Copy package.json and package-lock.json into the container
COPY package*.json package-lock.json ./

# Install dependencies using npm
RUN npm ci

# Copy the project files into the working directory
COPY ./ ./

# Build the React app for production
RUN npm run build

################################
#### PRODUCTION ENVIRONMENT ####
################################

# Use the official NGINX image for production
FROM nginx:stable-alpine AS production

# Copy nginx configuration inside conf.d folder
COPY --from=build /usr/src/app/nginx /etc/nginx/conf.d

# Copy the build output from the dist folder into the Nginx html directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose port 80 to allow access to the app
EXPOSE 80

# Run Nginx in the foreground
ENTRYPOINT ["nginx", "-g", "daemon off;"] 

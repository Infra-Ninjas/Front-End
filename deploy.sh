#!/bin/bash
set -e

echo "Logging in to Docker (if needed)..."
# Uncomment the next line if you need to log in interactively.
# docker login

# --- Pull, Tag, and Remove Original Tags ---

echo "Pulling authentication-service image..."
docker pull yashikadesul/authentication-service:latest
docker tag yashikadesul/authentication-service:latest authentication-service:latest
docker rmi -f yashikadesul/authentication-service:latest

echo "Pulling admin-service image..."
docker pull yashikadesul/admin-service:latest
docker tag yashikadesul/admin-service:latest admin-service:latest
docker rmi -f yashikadesul/admin-service:latest

echo "Pulling db-service image..."
docker pull yashikadesul/db-service:latest
docker tag yashikadesul/db-service:latest db-service:latest
docker rmi -f yashikadesul/db-service:latest

echo "Pulling user-service image..."
docker pull yashikadesul/user-service:latest
docker tag yashikadesul/user-service:latest user-service:latest
docker rmi -f yashikadesul/user-service:latest

echo "Pulling doctor-service image..."
docker pull yashikadesul/doctor-service:latest
docker tag yashikadesul/doctor-service:latest doctor-service:latest
docker rmi -f yashikadesul/doctor-service:latest

echo "Listing newly tagged images:"
docker images | grep -E "authentication-service|admin-service|db-service|user-service|doctor-service"

# --- Run Containers ---
# 2. Create custom network
docker network create backendnetwork

echo "Running containers..."
# 3. Run containers on the custom network
docker run -d --name authentication-service --network backendnetwork -p 4000:4000 authentication-service:latest
docker run -d --name db-service --network backendnetwork -p 5000:5000 db-service:latest
docker run -d --name admin-service --network backendnetwork -p 4001:4001 admin-service:latest
docker run -d --name user-service --network backendnetwork -p 4002:4002 user-service:latest
docker run -d --name doctor-service --network backendnetwork -p 4003:4003 doctor-service:latest
echo "Listing running containers:"
docker ps

echo "If any container is not running, check with:"
echo "docker ps -a"
echo "docker logs <container_id>"

echo "Deployment complete. Test the services in your browser at:"
echo "http://localhost:4000 (authentication-service)"
echo "http://localhost:4001 (admin-service)"
echo "http://localhost:4002 (user-service)"
echo "http://localhost:4003 (doctor-service)"
echo "http://localhost:5000 (db-service)"

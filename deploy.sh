#!/bin/bash
set -e

echo "🚀 Logging in to Docker (if needed)..."
# docker login  # Uncomment if your DockerHub account requires login

# --- Pull, Tag, and Clean Up Original Tags ---

echo "📦 Pulling authentication-service image..."
docker pull --platform linux/amd64 yashikadesul07/authentication-service:latest
docker tag yashikadesul07/authentication-service:latest authentication-service:latest
docker rmi -f yashikadesul07/authentication-service:latest

echo "📦 Pulling admin-service image..."
docker pull --platform linux/amd64 yashikadesul07/admin-service:latest
docker tag yashikadesul07/admin-service:latest admin-service:latest
docker rmi -f yashikadesul07/admin-service:latest

echo "📦 Pulling db-service image..."
docker pull --platform linux/amd64 yashikadesul07/db-service:latest
docker tag yashikadesul07/db-service:latest db-service:latest
docker rmi -f yashikadesul07/db-service:latest

echo "📦 Pulling user-service image..."
docker pull --platform linux/amd64 yashikadesul07/user-service:latest
docker tag yashikadesul07/user-service:latest user-service:latest
docker rmi -f yashikadesul07/user-service:latest

echo "📦 Pulling doctor-service image..."
docker pull --platform linux/amd64 yashikadesul07/doctor-service:latest
docker tag yashikadesul07/doctor-service:latest doctor-service:latest
docker rmi -f yashikadesul07/doctor-service:latest

echo "🖼️  Listing newly tagged images:"
docker images | grep -E "authentication-service|admin-service|db-service|user-service|doctor-service"

# --- Run Containers ---

echo "🔌 Creating custom Docker network (if not exists)..."
docker network inspect backendnetwork >/dev/null 2>&1 || docker network create backendnetwork

echo "🧼 Stopping and removing old containers (if exist)..."
docker rm -f authentication-service db-service admin-service user-service doctor-service 2>/dev/null || true

echo "🐳 Running containers..."
docker run -d --name authentication-service --network backendnetwork -p 4000:4000 authentication-service:latest
docker run -d --name db-service --network backendnetwork -p 5500:5000 db-service:latest
docker run -d --name admin-service --network backendnetwork -p 4001:4001 admin-service:latest
docker run -d --name user-service --network backendnetwork -p 4002:4002 user-service:latest
docker run -d --name doctor-service --network backendnetwork -p 4003:4003 doctor-service:latest

echo "📋 Listing running containers:"
docker ps

echo ""
echo "✅ Deployment complete. You can test the services in your browser:"
echo "🔐 http://localhost:4000 - authentication-service"
echo "🛠️  http://localhost:4001 - admin-service"
echo "👤 http://localhost:4002 - user-service"
echo "🩺 http://localhost:4003 - doctor-service"
echo "💾 http://localhost:5500 - db-service"

echo ""
echo "📢 If a container isn't running, troubleshoot with:"
echo "  docker ps -a"
echo "  docker logs <container_name>"

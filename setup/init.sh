#!/bin/bash

# Define colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}===== Escola de Música API Setup =====${NC}"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo -e "${RED}Error: Docker is not running. Please start Docker and try again.${NC}"
  exit 1
fi

# Stop any existing containers
echo -e "${YELLOW}Stopping existing containers if any...${NC}"
docker compose down

# Start docker-compose
echo -e "${BLUE}Starting Docker containers...${NC}"
docker compose up -d

# Wait for postgres to be ready
echo -e "${BLUE}Waiting for Postgres to be ready...${NC}"
sleep 10

# Generate migrations
echo -e "${BLUE}Generating migrations...${NC}"
bun run generate

# Run migrations
echo -e "${BLUE}Running migrations...${NC}"
docker compose exec api bun run migrate

# Seed the database
echo -e "${BLUE}Seeding database...${NC}"
docker compose exec api bun run seed

echo -e "${GREEN}Setup completed successfully!${NC}"
echo -e "${GREEN}API is running at http://localhost:3000${NC}"
echo -e "${YELLOW}To view logs: docker-compose logs -f api${NC}"
echo -e "${YELLOW}To stop containers: docker-compose down${NC}"
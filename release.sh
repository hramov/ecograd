git pull origin main
docker-compose stop
docker build -t ecograd_server .
docker-compose up -d && docker-logs -f
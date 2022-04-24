git pull origin main
chmod -R 777 .
docker-compose stop
docker build -t ecograd_server .
docker-compose up -d && docker-logs -f
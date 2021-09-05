docker build -t ecograd_server .
docker run --rm -it --name ecograd_server -p 5000:5000 ecograd_server

CGO_ENABLED=0 GOOS=linux go build -a -ldflags '-extldflags "-static"' -o ecograd_crawler .
docker build -t ecograd_crawler .
scp ./ecograd_crawler 185.154.53.78:/srv/ecograd/crawler

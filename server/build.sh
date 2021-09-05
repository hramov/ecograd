CGO_ENABLED=0 GOOS=linux go build -a -ldflags '-extldflags "-static"' -o ecograd_server .
docker build -t ecograd_server .
scp ./ecograd_server 185.154.53.78:/srv/ecograd/server

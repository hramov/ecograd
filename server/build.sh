CGO_ENABLED=0 GOOS=linux go build -a -ldflags '-extldflags "-static"' -o ecograd_server .
docker build -t ecograd_server .

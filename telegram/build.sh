CGO_ENABLED=0 GOOS=linux go build -a -ldflags '-extldflags "-static"' -o ecograd_telegram .
docker build -t ecograd_telegram .
scp ./ecograd_telegram 185.154.53.78:/srv/ecograd/telegram

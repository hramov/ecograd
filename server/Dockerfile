#FROM scratch
#ADD ./ecograd_server /
#CMD ["./ecograd_server"]

FROM alpine:latest
RUN mkdir /app
WORKDIR /app
ADD ./ecograd_server .
RUN ls
ENTRYPOINT ["./ecograd_server"]

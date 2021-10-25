FROM golang:alpine as build
RUN apk --no-cache add -U ca-certificates

FROM scratch
COPY --from=build /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY ./main /main
COPY logs logs/
COPY uploads/avatars uploads/avatars
EXPOSE 5000
ENTRYPOINT ["/main"]
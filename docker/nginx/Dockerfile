FROM nginx:alpine

RUN apk add --update --no-cache curl

COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf

COPY build /root/static

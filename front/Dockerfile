### STAGE 1: Build ###
FROM node:16.10-alpine AS build
WORKDIR /usr/src/app
COPY . .

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY --from=build /usr/src/app/dist/front /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
CMD ["nginx","-g","daemon off;"]
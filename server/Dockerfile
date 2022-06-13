FROM node:16.15.0-alpine as build


WORKDIR /app
COPY . /app/

# prepare for build
RUN npm install --silent
RUN npm run build


# move build to new container
FROM node:16.15.0-alpine
WORKDIR /app

COPY --from=build /app/dist /app/
COPY package.json /app/package.json
COPY wait-for-it.sh /app/wait-for-it.sh

RUN npm install --silent
RUN apk add --no-cache bash


# expose port
EXPOSE 5500
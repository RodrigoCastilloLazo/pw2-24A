FROM node:12-buster-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

FROM nginx:1.19

RUN apt-get update && apt-get install -y nodejs npm

COPY --from=build /app /app

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 3000

CMD sh -c "node /app/index.js & nginx -g 'daemon off;'"

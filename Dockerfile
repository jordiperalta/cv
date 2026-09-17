FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY docker-entrypoint.sh /usr/local/bin/cv-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/bin/sh", "/usr/local/bin/cv-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

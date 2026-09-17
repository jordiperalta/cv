FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci && mv node_modules /node_modules

EXPOSE 5173

CMD ["/node_modules/.bin/vite", "--host", "0.0.0.0"]


FROM node:lts-alpine AS builder

WORKDIR '/app'

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build


FROM nginx:alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom config
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy React build output
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
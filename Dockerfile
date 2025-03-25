# Stage 1: Build the application.
FROM node:22-alpine AS builder

WORKDIR /app

COPY . .
RUN npm install

# Compile the app
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:alpine

# Install bash (optional, but used in some base images)
RUN apk add --no-cache bash

# Copy built frontend
COPY --from=builder /app/dist /usr/share/nginx/html

# Custom NGINX config
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# ---- Stage 1: Build the App ----
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Rebuild esbuild for Alpine if needed
RUN npm rebuild esbuild

# Build the React app
RUN npm run build


# ---- Stage 2: Serve with NGINX ----
FROM nginx:alpine AS runner

# Copy build output to NGINX's web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace default nginx config with custom one
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]

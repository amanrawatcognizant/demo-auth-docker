# ---- Stage 1: Build ----
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app source code
COPY . .

# Rebuild esbuild for Alpine environment
RUN npm rebuild esbuild

# Build the app
RUN npm run build


# ---- Stage 2: Serve ----
FROM node:18-alpine AS runner

WORKDIR /app

# Install serve globally to serve static files
RUN npm install -g serve

# Copy only the built app from builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Run the production build with serve
CMD ["serve", "-s", "dist", "-l", "3000"]

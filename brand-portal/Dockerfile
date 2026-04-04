# Dockerfile for brand-portal
FROM node:20-alpine AS base

WORKDIR /app

# Copy package files and node_modules
COPY package.json package-lock.json* ./
COPY node_modules ./node_modules

# Copy the application source code
COPY . .

# Build the specific application - using existing node_modules
RUN npm run build

# --- Runner Stage ---
FROM node:20-alpine AS runner
WORKDIR /app

# Copy only the built artifacts from the base stage
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static

# Create public directory
RUN mkdir -p /app/public

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.js"]

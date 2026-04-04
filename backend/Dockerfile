# Corrected Dockerfile for backend
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.0.6 --activate

WORKDIR /app

# First, copy only the files needed for dependency installation
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/ ./packages/
COPY AthleteID/backend/package.json ./AthleteID/backend/
COPY AthleteID/brand-portal/package.json ./AthleteID/brand-portal/
COPY AthleteID/main/package.json ./AthleteID/main/

# Install all dependencies
RUN pnpm install --frozen-lockfile

# Copy the application source code
COPY AthleteID/backend/ ./AthleteID/backend/
COPY packages/ ./packages/

# Generate prisma client
RUN pnpm --filter athlete-id-backend prisma:generate

# Build the specific application
RUN pnpm --filter athlete-id-backend build

# --- Runner Stage ---
FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=base /app/AthleteID/backend/dist ./dist
COPY --from=base /app/AthleteID/backend/prisma ./prisma
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/packages/ ./packages/
COPY --from=base /app/AthleteID/backend/package.json ./package.json


ENV NODE_ENV=production
EXPOSE 4000
CMD ["node", "dist/server.js"]

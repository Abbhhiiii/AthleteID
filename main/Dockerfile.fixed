FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate

WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY AthleteID/packages/shared/package.json ./packages/shared/
COPY AthleteID/main/package.json ./main/

RUN pnpm install --frozen-lockfile

COPY AthleteID/packages/shared/ ./packages/shared/
COPY AthleteID/main/ ./main/

RUN pnpm --filter @athleteid/main build

FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=base /app/main/.next/standalone ./
COPY --from=base /app/main/.next/static ./main/.next/static
COPY --from=base /app/main/public ./main/public

ENV NODE_ENV=production
EXPOSE 3001
CMD ["node", "main/server.js"]

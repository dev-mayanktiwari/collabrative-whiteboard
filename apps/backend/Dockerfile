FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
RUN apk update && apk add --no-cache libc6-compat
WORKDIR /app
RUN pnpm install -g turbo  
COPY . .
RUN turbo prune backend --docker

FROM base AS installer
WORKDIR /app
COPY --from=builder /app/out/json/ .
RUN pnpm install
COPY --from=builder /app/out/full/ .
RUN pnpm db:generate
RUN pnpm turbo build 

FROM base AS runner
WORKDIR /app
COPY --from=installer /app .

CMD ["node", "apps/backend/dist/index.js"]
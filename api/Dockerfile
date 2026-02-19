# Build stage
FROM node:20-slim AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm install --omit=dev; fi

# Production stage
FROM node:20-slim

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Usuario no root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 apiuser
USER apiuser

COPY --from=builder --chown=apiuser:nodejs /app/node_modules ./node_modules
COPY --chown=apiuser:nodejs . .

EXPOSE 8080

CMD ["node", "index.js"]

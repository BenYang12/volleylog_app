# ---- deps ----
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ---- runtime ----
FROM node:20-alpine
WORKDIR /app

# Copy production deps and source
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY src/ ./src/

ENV NODE_ENV=production
EXPOSE 4000

CMD ["node", "src/index.js"]

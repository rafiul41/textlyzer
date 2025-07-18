# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
RUN npm install --only=production
RUN npm install -g ts-node typescript
COPY --from=builder /app/src ./src
COPY --from=builder /app/keycloak.json ./keycloak.json
EXPOSE 3001
CMD ["node", "dist/index.js"] 
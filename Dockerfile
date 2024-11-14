# Stage 1: Build a the app
FROM node:23-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

FROM node:23-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

# CMD ["npm", "run", "start:prod"]
# CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]
CMD ["sh", "-c", "npx prisma migrate dev --schema=./prisma/schema.prisma && npm run start:prod"]




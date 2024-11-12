# Stage 1: Build a the app
FROM node:23-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# Stage 2: Create a minimal runtime image
FROM node:23-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist /usr/src/app/dist

COPY package*.json ./

RUN npm install --only=production

EXPOSE 3000

CMD ["node", "dist/main"]




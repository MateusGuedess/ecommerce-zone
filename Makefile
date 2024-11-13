
postgres:
	 docker run --name postgres17 -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres:17-alpine

createdb:
	docker exec -it postgres17 createdb --username=root --owner=root z1

execdb:
	docker exec -it postgres17 psql -U root -d z1
	
dropdb:
	docker exec -it postgres17 dropdb z1

up:
	docker-compose up --build

compose:
	docker-compose build

migrate:
	npx prisma migrate dev --name init

.PHONY: up postgres createdb dropdb execdb

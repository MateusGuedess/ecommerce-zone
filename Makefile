#build the Docker image
build:
	docker build -t server .

# Run Dockerfile
run: 
	docker run -p 3000:3000 server

# Run the Docker container with docker compose
up:
	docker-compose up

# Stop and remove Docker containers
stop:
	docker-compose down

# Clean up build artifacts
clean:
	rm -rf node_modules dist

.PHONY: build run up stop clean

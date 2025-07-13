DOCKER_COMPOSE_DEV = docker-compose -f ./.docker/docker-compose.dev.yml
DOCKER_COMPOSE_PROD = docker-compose -f ./.docker/docker-compose.prod.yml -p tye

.PHONY: rm-volumes
rm-volumes:
	$(DOCKER_COMPOSE_DEV) down -v
	docker volume prune -a -f

.PHONY: rm-images
rm-images:
	$(DOCKER_COMPOSE_DEV) down --rmi all
	docker image prune -a -f

.PHONY: rm-containers
rm-containers:
	docker container prune -f

.PHONY: rm-networks
rm-networks:
	docker network prune -f

.PHONY: rm-system
rm-system: 
	docker system prune --volumes -f

.PHONY: rm-all
rm-all: rm-volumes rm-images rm-containers rm-system rm-networks

# DEV

.PHONY: build-dev
build-dev:
	$(DOCKER_COMPOSE_DEV) build

.PHONY: up-dev
up-dev:
	$(DOCKER_COMPOSE_DEV) up -d

.PHONY: up-service-dev
up-service-dev:
	$(DOCKER_COMPOSE_DEV) up -d --no-deps --build $(SERVICE)

.PHONY: up-logs-dev
up-logs-dev:
	$(DOCKER_COMPOSE_DEV) up

.PHONY: up-logs-service-dev
up-logs-service-dev:
	$(DOCKER_COMPOSE_DEV) up --no-deps --build $(SERVICE)

.PHONY: down-dev
down-dev:
	$(DOCKER_COMPOSE_DEV) down

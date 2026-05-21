.PHONY: help run test migrate-up migrate-down seed build docker-up docker-down lint

DB_URL ?= postgres://achadinhos:achadinhos_dev@localhost:5432/achadinhos?sslmode=disable

help: ## lista os alvos disponíveis
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

run: ## roda o servidor em dev
	go run ./cmd/api

test: ## roda todos os testes
	go test ./... -race -count=1

migrate-up: ## aplica migrations (requer CLI golang-migrate)
	migrate -path ./migrations -database "$(DB_URL)" up

migrate-down: ## reverte última migration
	migrate -path ./migrations -database "$(DB_URL)" down 1

seed: ## popula banco com mock data
	go run ./cmd/seed

build: ## compila binário em ./bin/api
	go build -o ./bin/api ./cmd/api

docker-up: ## sobe Postgres 18 em docker
	docker compose up -d postgres

docker-down: ## derruba containers
	docker compose down

lint: ## roda go vet
	go vet ./...

# Thin wrappers over package.json scripts.

.PHONY: help install dev build start lint test
help:
	@echo "install - npm ci"
	@echo "dev     - dev server on http://localhost:3000"
	@echo "build   - production build"
	@echo "start   - serve the production build"
	@echo "lint    - next lint"
	@echo "test    - jest"

node_modules:
	npm ci

install:
	npm ci

dev: | node_modules
	npm run dev

build: | node_modules
	npm run build

start: build
	npm start

lint: | node_modules
	npm run lint

test: | node_modules
	npm test

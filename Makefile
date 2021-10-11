SHELL := /bin/bash

.DEFAULT_GOAL = help

export APP_VERSION ?= 1.0.0-dev
export PROJECT_DIR ?= $(CURDIR)
export DOCKER_BUILD_PATH ?= $(CURDIR)/docker/docker-compose.build.yml
export DOCKER_APP_PATH ?= $(CURDIR)/docker/docker-compose.yml

help:				## Show this help.
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'


# BUILD:
build-app:				## Build Heart Rate Application (Server)
	@docker rmi -f heart-rate-client:${APP_VERSION}
	@docker rmi -f heart-rate-server:${APP_VERSION}
	@docker-compose -f $(DOCKER_BUILD_PATH) build --no-cache

build-app-client:				## Build Heart Rate Application (Client)
	@docker rmi -f heart-rate-client:${APP_VERSION}
	@docker-compose -f $(DOCKER_BUILD_PATH) build heart-rate-client

build-app-server:				## Build Heart Rate Application (Server)
	@docker rmi -f heart-rate-server:${APP_VERSION}
	@docker-compose -f $(DOCKER_BUILD_PATH) build heart-rate-server

# START/STOP:
start-app:				## Start Heart Rate Application (Server + FE)
	@docker-compose -p heart_rate -f $(DOCKER_APP_PATH) up -d

stop-app:				## Stop Heart Rate Application (Server + FE)
	@docker-compose -p heart_rate -f $(DOCKER_APP_PATH) down

logs-app:				## Get Heart Rate Application Logs (Server + FE)
	@docker-compose -p heart_rate -f $(DOCKER_APP_PATH) logs -f

.PHONY: help build-app start-app stop-app logs-app
SHELL := /bin/bash

.DEFAULT_GOAL = help

export APP_VERSION ?= 1.0.0-dev
export PROJECT_DIR ?= $(CURDIR)
export DOCKER_BUILD_PATH ?= $(CURDIR)/docker/docker-compose.build.yml

help:				## Show this help.
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'


# BUILD:
build-app:				## Build Heart Rate Application (Server)
	@docker-compose -f $(DOCKER_BUILD_PATH) build --no-cache

# START/STOP:
start-app:				## Start Heart Rate Application (Server + FE)
	@docker-compose -p heart_rate -f $(DOCKER_BUILD_PATH) up -d

stop-app:				## Stop Heart Rate Application (Server + FE)
	@docker-compose -p heart_rate -f $(DOCKER_BUILD_PATH) down

.PHONY: help build-app start-app stop-app
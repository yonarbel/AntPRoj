#!/usr/bin/env bash

set -e

export PROJECT_ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && cd ../.. && pwd)"

cd "${PROJECT_ROOT_DIR}/"

function on_start() {
  echo "started"
}

function on_execute() {
  echo "executing..."
  make ${1}
}

function on_success() {
  echo "success"
}

function on_failure() {
  echo "failed"
}

function on_complete() {
  echo "completed!"
}
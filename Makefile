PATH:=${PATH}:node_modules/.bin
DEV_URL=http://localhost:8080
REV=${shell git rev-parse HEAD}

all: run

version:
	@echo ${shell grep '"version":' package.json | cut -d\" -f4}

install:
	npm install --force fsevents
	npm install

list-installed:
	npm list --depth 0

lint:
	eslint *.js src

unittest:
	jest
	@echo "Full report in browser: file://${PWD}/coverage/index.html"

unittest-update:
	jest -u

unittest-watch:
	jest --watch

test: unittest lint

run-dev:
	DEV_URL=${DEV_URL} REV=${REV} webpack-dev-server -d --port 3000 --color

run: clean test run-dev

dist: clean test
	NODE_ENV=production REV=${REV} webpack -p --progress --colors
	cp src/index.html dist/
	cp -r src/login dist/

clean:
	find . -type f -name '*~' -exec rm -f {} \;
	rm -rf dist coverage src/bundle.*
	jest --clearCache

.PHONY: all version install list-installed lint unittest unittest-update unittest-watch test run-dev run dist clean

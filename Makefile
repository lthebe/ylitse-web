PATH:=${PATH}:node_modules/.bin
API_URL=http://127.0.0.1:8080

all: run

version:
	@echo $(shell grep '"version":' package.json | cut -d\" -f4)

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

run: clean test
	API_URL=${API_URL} webpack-dev-server -d --port 3000 --color

dist: clean lint
	NODE_ENV=production API_URL=${API_URL} webpack -p --progress --colors

clean:
	find . -type f -name '*~' -exec rm -f {} \;
	rm -rf dist coverage src/bundle.*
	jest --clearCache

.PHONY: all version install list-installed lint unittest unittest-update unittest-watch test run dist clean

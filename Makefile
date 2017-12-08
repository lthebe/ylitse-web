PATH := $(PATH):node_modules/.bin
.DEFAULT_GOAL := run

version:
	npm run version --silent

install:
	npm install --force fsevents
	npm install

list-installed:
	npm list --depth 0

lint:
	eslint src

run: clean lint
	webpack-dev-server -d --port 3000 --color

dist: clean lint
	NODE_ENV=production webpack -p --progress --colors

clean:
	find . -type f -name '*~' -exec rm -f {} \;
	rm -rf dist src/bundle.*

.PHONY: version install list-installed lint run dist clean

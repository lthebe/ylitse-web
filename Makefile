PATH:=${PATH}:node_modules/.bin
API_URL=http://127.0.0.1:8080

all: run

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
	API_URL=${API_URL} webpack-dev-server -d --port 3000 --color

dist: clean lint
	NODE_ENV=production API_URL=${API_URL} webpack -p --progress --colors

clean:
	find . -type f -name '*~' -exec rm -f {} \;
	rm -rf dist src/bundle.*

.PHONY: version install list-installed lint run dist clean

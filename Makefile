.PHONY: run
run:
	npm install
	node server.js

.PHONY: build
build:
	./node_modules/react-tools/bin/jsx --watch src/ build/

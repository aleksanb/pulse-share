.PHONY: run
run:
	node server.js

.PHONY: build
build:
	./node_modules/react-tools/bin/jsx --watch src/ build/

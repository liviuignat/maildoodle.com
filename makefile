test:
	NODE_ENV=integration_tests ./node_modules/mocha/bin/mocha $(FILE) --compilers js:babel-core/register --timeout 5000

.PHONY: test

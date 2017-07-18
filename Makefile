HTML_FILES = $(shell find src -type f | grep -v /_ | grep -E '\.(pug|md)' | tr '\n' ' ' | sed 's/\.pug/.html/g' | sed 's/\.md/.html/g' | sed 's/src\//build\//g')
CSS_FILES = $(shell find src -type f | grep .less | tr '\n' ' ' | sed 's/.less/.css/g' | sed 's/src\//build\//g')
JS_FILES = $(shell find src -type f | grep .js | tr '\n' ' ' | sed 's/src\//build\//g')
NODEPATH = $(shell npm bin)
all: html css js

html: $(HTML_FILES)
build/%.html: src/%.pug src/_layout.pug
	$(NODEPATH)/pug -p $< < $< > $@
build/%.html: src/%.md src/_layout.pug src/_md-template.pug
	$(NODEPATH)/marked $< -o $@.temp
	$(NODEPATH)/pug -O "{contents:require('fs').readFileSync('$@.temp')}" -p src/_md-template.pug < src/_md-template.pug > $@
	rm $@.temp

css: $(CSS_FILES)
build/%.css: src/%.less
	$(NODEPATH)/lessc $< $@

js: $(JS_FILES)
build/%.js: src/%.js
	$(NODEPATH)/babel $< > $@

clean:
	rm -rf build/*
	touch build/.gitkeep

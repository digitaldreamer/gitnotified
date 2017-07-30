ROOT = gitnotified
NODEPATH = $(ROOT)/node_modules/.bin:$(PATH)

run:
	cd $(ROOT); PATH=$(NODEPATH) npm run build
	electron gitnotified

watch:
	cd $(ROOT); PATH=$(NODEPATH) npm run watch

# alias npmbin='PATH=$(npm bin):$PATH'
build: clean
	cd $(ROOT); PATH=$(NODEPATH) npm run build
	electron-packager gitnotified

build-all: clean build-win build-mac build-linux

build-win:
	cd $(ROOT); PATH=$(NODEPATH) npm run build
	electron-packager gitnotified gitnotified --platform=win32 --arch=x64

build-mac:
	cd $(ROOT); PATH=$(NODEPATH) npm run build
	electron-packager gitnotified gitnotified --platform=darwin --arch=x64

build-linux:
	cd $(ROOT); PATH=$(NODEPATH) npm run build
	electron-packager gitnotified gitnotified --platform=linux --arch=x64

install:
	cd $(ROOT); npm install --save-dev copy-webpack-plugin
	# cd $(ROOT); npm install --save-dev electron-prebuilt-compile
	cd $(ROOT); npm install --save-dev electron electron-packager

	cd $(ROOT); npm install --save-dev webpack webpack-dev-server html-webpack-plugin
	cd $(ROOT); npm install --save-dev style-loader css-loader less less-loader

	cd $(ROOT); npm install --save-dev babel-loader babel-core
	cd $(ROOT); npm install --save-dev babel-preset-es2015 babel-preset-stage-2 babel-preset-react

clean:
	rm -rf gitnotified-darwin*
	rm -rf gitnotified-linux*
	rm -rf gitnotified-win32*
	rm -rf $(ROOT)/build

run:
	electron gitnotified

build: clean
	electron-packager gitnotified

build-all: clean build-win build-mac build-linux

build-win:
	electron-packager gitnotified gitnotified --platform=win32 --arch=x64

build-mac:
	electron-packager gitnotified gitnotified --platform=darwin --arch=x64

build-linux:
	electron-packager gitnotified gitnotified --platform=linux --arch=x64

install:
	npm install electron-prebuilt-compile
	# npm install electron
	npm install electron-packager

clean:
	rm -rf gitnotified-darwin*
	rm -rf gitnotified-linux*
	rm -rf gitnotified-win32*

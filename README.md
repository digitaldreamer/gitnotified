# Git Notified - pre-alpha

This project is meant to provide a more elegant way to keep up to date with actions happening on repos that you want to watch.

I've found it impossible to have one place that properly notifies me of relevant repo activity. It's either incomplete, noisy, and spread across different pages. This project is an attempt to aggregate everything you want to pay attention to and present it into one unified view that's easy to keep track and understand.

The project is in early development stages. Feedback and code contributions is greatly appreciated.

Checkout the issue and project boards to keep up to date with the progress and roadmap of the app.

* https://github.com/digitaldreamer/gitnotified/issues
* https://github.com/digitaldreamer/gitnotified/projects/1

# Tech Stack

The app is built in Electron using React in ES6. Less is used to structure the CSS, and the code is run through Babel and packaged with WebPack.

# Development Setup

To start you'll need the latest Node installed.

You can then either run `make install` or cd into the `gitnotified` sub-dir and run `npm install`.

## Workflow

Hotloading is not supported yet so the recommended workflow is to run the webpack watcher while in active development. There are several helpers set up, but you can chose your desired setup.

There are two node script targets to help:

```
npm run build
npm run watch
```

It runs the two webpack commands:

```
webpack
webpack -w
```

You can also use the make targets in the root dir to build or watch changes in the repo.

```
make build
make watch
```

`make run` will build the source and run electron.

It might be helpful to set up a `npmbin` bash alias to allow you to run the commands manually.

```
alias npmbin='PATH=$(npm bin):$PATH'
npmbin webpack
npmbin npm run build

npmbin webpack -w
npmbin npm run watch
```

# 1.0 Progress

- [x] keeps track of open PRs
- [x] desktop notifications
- [x] refreshes event streem
- [x] highlight @ mentions in comments
- [x] read from settings file
- [ ] initialize settings
- [ ] edit settings in-app
- [ ] support PR labels
- [ ] force refresh
- [ ] event filtering options
- [ ] notify of app upgrades

# 2.0 Ideas

- [ ] Support for issues

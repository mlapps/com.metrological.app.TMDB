### The Movie Database

This app was created to be used during online Lightning training sessions. The goal is to learn the different
parts of Lightning while following along the development of this app.

You can find the other app (game) that we've build during the online session [here](https://github.com/mlapps/com.metrological.app.Platformer).
_Router example app_ can be found [here](https://github.com/mlapps/router-example-app)


##### questions?

Feel free to ask them at: https://forum.lightningjs.io/


### Getting started

> Before you follow the steps below, make sure you have the
[Lightning-CLI](https://github.com/WebPlatformForEmbedded/Lightning-CLI) installed _globally_ only your system

```
npm install -g WebPlatformForEmbedded/Lightning-CLI
```

#### Running the App

1. Install the NPM dependencies by running `npm install`

2. Build the App using the _Lightning-CLI_ by running `lng build` inside the root of your project

3. Fire up a local webserver and open the App in a browser by running `lng serve` inside the root of your project


#### Developing the App

During development you can use the **watcher** functionality of the _Lightning-CLI_.

- use `lng watch` to automatically _rebuild_ your App whenever you make a change in the `src` or  `static` folder
- use `lng dev` to start the watcher and run a local webserver / open the App in a browser _at the same time_

#### Documentation

Use `lng docs` to open up the Lightning-SDK documentation.

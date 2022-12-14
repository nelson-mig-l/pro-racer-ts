# Pro Racer

_Will this ever be a racing game?_

A [Babylon.js](https://github.com/BabylonJS/Babylon.js) and [ammo.js](https://github.com/kripken/ammo.js/) game.

## Getting started

To run the game:

1. Clone / download this repository
2. run `npm install` to install the needed dependencies.
3. run `npm start`
4. A new window should open in your default browser. if it doesn't, open `http://localhost:8080`
5. ????
6. Profit

Running `npm start` will start the webpack dev server with hot-reloading turned on. Open your favorite editor (mine is VSCode, but you can use nano. we don't discriminate) and start editing.

The entry point for the entire TypeScript application is `./src/index.ts`. Any other file imported in this file will be included in the build.

To debug, open the browser's dev tool. Source maps are ready to be used. In case you are using VSCode, simply run the default debugger task (`Launch Chrome against localhost`) while making sure `npm start` is still running. This will allow you to debug your application straight in your editor.

## Deployment

### Current development branch

github pages after push to `dev` branch.
will build to branch `gh-pages`

### render.com

trigger to render.com after merge to `master`

## Loading different scenes 

The `./src/scenes` directory contains a few examples of scenes that can be loaded. To load a specific scene, add a `?scene=FILENAME` to the URL (i.e. to load the ammo physics demo, use `http://localhost:8080/?scene=physicsWithAmmo`).

More and more scenes will be slowly added.

## WebGPU? yes please!

Open the URL in a webgpu-enabled browser and add "?engine=webgpu" to the URL. If you want to add a different scene, add it as a query parameter: `http://localhost:8080/?scene=physicsWithAmmo&engine=webgpu`.

## What else can I do

To lint your source code run `npm run lint`

To build the bundle in order to host it, run `npm run build`. This will bundle your code in production mode, meaning is will minify the code.

Building will take some time, as it will build each sample (and create a different module for each). If you want to speed up the process, define the scene you want to render in `createScene.ts` (you can see the comment there)

## What is covered

- Latest typescript version
- Simple texture loading (using url-loader)
- dev-server will start on command (webpack-dev-server)
- A working core-only example of babylon
- Full debugging with any browser AND VS Code
- (production) bundle builder.
- eslint default typescript rules integrated

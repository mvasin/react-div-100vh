# The development guide

Happy to see you interested in contributing. It's a simple project in a nutshell, so could be a great start for contributing to open-source.

## The structure

The project is structured as [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/), with the package being one workspace and a few test apps that use the package. Thanks to using yarn workspaces, the test packages can use the latest library package (of course, the package has to be pre-built).

TODO: pre-build the lib in a hook?

## How to try it out locally

1. Clone the project: `git clone https://github.com/mvasin/react-div-100vh.git`. `cd` into the directory. All of the following commands are executed from the root directory of the project.
2. Make sure you're on the node version prescribed in `.nvmrc`; check with `node -v`, you might need to run `nvm use` if that's not being run on changing directories in your setup.
3. Install dependencies: `yarn`
4. Run unit tests: `yarn test`
5. Now, to the meat of it: you would like to start a test app that uses the `react-div-100vh` library and browse it around on your mobile device. So you
   5.1 Run `yarn build` - this will first build the library, and then the test app.
   5.2 Run `yarn serve` - this will serve the built app. You will see a message similar to the one below:

```
   ┌──────────────────────────────────────────────────┐
   │                                                  │
   │   Serving!                                       │
   │                                                  │
   │   - Local:            http://localhost:5000      │
   │   - On Your Network:  http://192.168.2.10:5000   │
   │                                                  │
   │   Copied local address to clipboard!             │
   │                                                  │
   └──────────────────────────────────────────────────┘
```

The bottom URL should work on your mobile device if it's on the same network as your computer.

The app allows to toggle between `<div style={{height: "100vh"}}>` and `<Div100vh>`.

6. Tweak the library in `packages/react-div-100vh/src`. To see the changes, stop the server with `CTRL-C` and do `yarn build && yarn serve`. Yeah, that's tedious, PR is welcome to improve.

7. If you like the changes, create a branch, commit the changes, make a fork of the project in your personal GitHub account, push the changes to a branch in your personal account, and create a merge request from that branch to https://github.com/mvasin/react-div-100vh.

## Releasing

Currently a manual process handled by the maintainer, to be automated.

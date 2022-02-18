# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) (+ Typescript support), and was adjusted to work as a Facebook MiniApp.

## Available Scripts

In the project directory, you can run:

### `npm start`
**Note: For this project to run locally as a web app, you need to set "mockMiniAppSDK" to true on src/config.json.**

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

This projest uses snapshot testing. If you are making any changes to UI components, please run "npm test -u" to update the snapshots.
Not doing so will cause test failures on "npm test".

### `npm run build`
**Note: For this project to build as a Mini App, you need to set "mockMiniAppSDK" to false on src/config.json.**

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

### `npm run pack-mini-app`
**Note: For this project to build as a Mini App, you need to set "mockMiniAppSDK" to false on src/config.json.**

Builds the Mini App and adds a zip to the /build folder with the name "mini-app-boilerplate-v<version>.zip".
Your FB Mini App is ready to be uploaded!
See section **Create your Mini App client** (option 1) below.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More About Create React App

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


# MiniApp Developer Onboarding Instructions

You can find complete instructions for developer onboarding in [wiki](./wiki/Mini-Apps-Developer-Onboarding-Instructions) section.

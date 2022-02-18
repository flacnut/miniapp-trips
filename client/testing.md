# Preview and Testing

We have made it really easy for you to test your development version without uploading the build to our server. Please read on.

## Preview
In order to facilitate the development and testing workflow, we enable developers to run the game from a local server with a very similar experience to what their customers will see on our platform. This is done through our embedded test player, which doesn't require any configuration.

Just access the [preview page on our developer portal](https://developers.facebook.com/tools/mini-app-preview/) and provide your **localhost** URL in the form and you are good to go.

The player will resolve all your API calls and allow you to test the complete flow.

## Testing
We are sharing a list of commonly seen issues or patterns that we have come across during the testing of multiple MiniApps. Please dont consider this as a complete list as it will be evolving in the future.

- Please avoid using local and session storage APIs.
- Please dont use any redirects. Try to use any library that supports History API for internal navigation.
- Base path in router
  We use an internal URL to load  your applet in the player and this sometimes break your app as it might not consider any extra path in the URL as base path
  If your are using [React Router](https://reactrouter.com/), please set [_basename_](https://reactrouter.com/web/api/BrowserRouter/basename-string) prop on
  ```JS
  <BrowserRouter basename={window.location.pathname}>
  ```
  For [Reach Router](https://reach.tech/router), set [_basepath_](https://reach.tech/router/api/Router).
  ```JS
  <Router basepath={window.location.pathname} />
  ```
- Please test your min app with different paths to make sure that any assets are loading properly.
    For example:
    - _http://locahost:3000/app_
    - _http://locahost:3000/mini/app_
    - _http://locahost:3000/facebook/mini/app_
    - _http://locahost:3000/app/index.html_

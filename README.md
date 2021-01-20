# GPS Tracks Viewer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.7.

## Development server

For requesting back-end part of application it is needed proxy configuration file. There is an example for it:

```json
{
  "/api": {
    "target": "https://example.com",
    "secure": true,
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": ""
    }
  }
}
```

1. `/api` property of the object specifies the route for the proxy and the nested object specifies the configuration.

2. `target`”` property of the nested object specifies the API url for requesting.

3. `secure` property is used to specify whether the target is being served over http or https.

4. `changeOrigin` property specifies that the target is on another domain different from that which the app is currently running on.

5. `pathRewrite` property allows you modify how the application interacts with the target.

Also it is needed to modify the `angular.json` file and add the following lines of code to the architect configuration object:

```json
{
  "serve": {
    "builder": "@angular-devkit/build-angular:dev-server",
    "options": {
      "browserTarget": "projectname:build",
      "proxyConfig": "./proxy.conf.json"
    },
  }
}
```

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

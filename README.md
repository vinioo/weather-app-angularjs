# Micro front-end starter for angularjs projects

This project is a template starter for micro front-ends built with angularjs + typescript + webpack. Here is some project features:

* Typescript;
* ESLint for javascript and typescript;
* Webpack;
* Editor config;
* Babel.

## Get started

* Clone this project;
* Drop all content, files and folders of future micro front into `src`;
* You can create alias in `webpack.config.js`, for example:
```javascript
modules: [
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'src/app'),
    // Create alias for components folder. That way you can import from components folders like that: import { MyComponent } from 'components/MyComponent'
    path.resolve(__dirname, 'src/components'),
    'node_modules',
],
```

## TODOS

- [ ] Create unity test to check if Iframe Message Proxy has been initialized correctly;
- [ ] Create folders to organize configuration files (webpacks, plugins files and etc);
- [ ] Config prettier;
- [ ] Deploy to yeoman to create easier applications or create some `blip-cli` like `create-react-app` to initialize this project easily.
# weather-app-angularjs

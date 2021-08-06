/**
 * This module, when loaded, bootstraps the angular application contained in './app'.
 */

import 'babel-polyfill';
import * as angular from 'angular';
import { appStatesModules } from 'app.states';

// bootstrap angular application
angular.element(document).ready(() => {
    angular.bootstrap(document.documentElement, [appStatesModules], {
        strictDi: false,
    });
});

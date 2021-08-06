import "angular-ui-router";
import * as angular from "angular";
import { ILocationProvider } from "angular";
import { IStateProvider, IUrlRouterProvider } from "angular-ui-router";
import { coreModule } from "core";
import WeatherView from "./modules/weather/WeatherView.html";
import WeatherController from "./modules/weather/WeatherController";
import { WeatherCard } from "components/Card/card.component";
import { WeatherLogo } from "components/Logo/logo.component";
import { WeatherService } from "services/weather.service";

export const appStatesModules = angular
    .module("app", ["ui.router", coreModule])
    .component("weatherCard", WeatherCard)
    .component("weatherLogo", WeatherLogo)
    .filter("round", () => {
        return function(value) {
            return Math.round(value);
        };
    })
    .service("weatherService", WeatherService)
    .config(
        (
            $stateProvider: IStateProvider,
            $urlRouterProvider: IUrlRouterProvider,
            $locationProvider: ILocationProvider
        ) => {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });

            $stateProvider.state("weather", {
                url: "/",
                controllerAs: "$ctrl",
                controller: WeatherController,
                template: WeatherView
            });

            $urlRouterProvider.otherwise("/404");
        }
    ).name;

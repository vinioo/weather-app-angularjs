import LogoTemplate from './logo.html';
import './logo.css';

export class WeatherLogo implements angular.IComponentOptions {
    static selector = 'weather-logo';

    static template = LogoTemplate;
    static bindings = {
      contactAdded: '&'
    };
  }

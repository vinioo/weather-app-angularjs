import "./Weather.css";
import { WeatherService } from "services/weather.service";
import { ITimeoutService } from "angular";

class WeatherController {
    public city: string = 'Belo Horizonte';
    public forecast;
    public isLoading: boolean;

    constructor(
        private weatherService: WeatherService,
        private $timeout: ITimeoutService
    ) {
        this.$onInit();
    }

    async $onInit() {
        this.getForecast();
    }

    public async getForecast() {
        try {
            this.isLoading = true;
            const { data: items } = await this.weatherService.getForecast(
                this.city
            );

            this.$timeout(() => {
                this.forecast = (items as any).data;
            });

        } catch (err) {
            console.error("Failed to get forecast", err);
        } finally {
            this.isLoading = false;
        }
    }

    handleSearch() {
        this.getForecast();
    }
}

export default WeatherController;

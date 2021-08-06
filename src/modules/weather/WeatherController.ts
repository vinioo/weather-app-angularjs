import "./Weather.css";
import { WeatherService } from "services/weather.service";
import { ITimeoutService } from "angular";

class WeatherController {
    public city: string;
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

    public async getForecast(city: string = 'Belo Horizonte') {
        try {
            this.isLoading = true;
            const { data: items } = await this.weatherService.getForecast(
                city
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
        this.getForecast(this.city);
    }
}

export default WeatherController;

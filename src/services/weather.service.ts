import { IHttpService } from "angular";

const apiUrl = "https://api.weatherbit.io/v2.0/forecast/daily";
export const iconApiUrl = "https://www.weatherbit.io/static/img/icons/";

export class WeatherService {
    static selector = "weatherService";

    constructor(private $http: IHttpService) {}

    public async getForecast(city: string) {
        return this.$http({
            method: "get",
            url: apiUrl,
            params: { key: "5490d8df7dba44ca8af337baa984ba31", days: "5", city },
        });
    }
}

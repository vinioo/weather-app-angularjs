import { ComponentController } from "../";
import CardTemplate from "./card.html";
import "./card.css";
import { IComponentController } from "angular";
import { iconApiUrl } from "services/weather.service";

class WeatherCardController extends ComponentController
    implements IComponentController {
    public teste = "vinicius";
    public min: string;
    public max: string;
    public icon: string;
    public iconUrl: string;
    private date: Date;

    constructor() {
        super();
        this.iconUrl = `${iconApiUrl}${this.icon}.png`;
    }

    public mapWeekDays = key => {
        const days = {
            0: "Domingo",
            1: "Segunda",
            2: "Terça",
            3: "Quarta",
            4: "Quinta",
            5: "Sexta",
            6: "Sábado"
        };

        return days[key];
    };

    public getWeekDayName = () => {
        const day = new Date(`${this.date} 00:00`).getDay();
        return this.mapWeekDays(day);
    };
}

export const WeatherCard = {
    template: CardTemplate,
    controller: WeatherCardController,
    controllerAs: "$ctrl",
    bindings: {
        min: "@?",
        max: "@?",
        date: "@?",
        icon: "@?"
    },
    transclude: false
};

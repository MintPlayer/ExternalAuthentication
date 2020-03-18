import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherForecastService } from '../../services/weather-forecast/weather-forecast.service';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.scss']
})
export class FetchDataComponent implements OnInit {
  public forecasts: WeatherForecast[];

  constructor(private weatherForecastService: WeatherForecastService) {
    this.weatherForecastService.getWeatherForecasts().then((forecasts) => {
      this.forecasts = forecasts;
    }).catch((error) => {
      console.error(error);
    })
  }

  ngOnInit() {
  }

}

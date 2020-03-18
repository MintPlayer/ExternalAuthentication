import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {
  constructor(private httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }

  public getWeatherForecasts() {
    return this.httpClient.get<WeatherForecast[]>(`${this.baseUrl}/weatherforecast`).toPromise();
  }
}

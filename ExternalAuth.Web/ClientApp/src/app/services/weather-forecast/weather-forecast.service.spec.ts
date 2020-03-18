import { TestBed } from '@angular/core/testing';

import { WeatherForecastService } from './weather-forecast.service';

describe('WeatherForecastService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeatherForecastService = TestBed.get(WeatherForecastService);
    expect(service).toBeTruthy();
  });
});

import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, of, debounceTime, switchMap, catchError } from 'rxjs';
import { WeatherService } from '../../services/weather.service';
 
interface ForecastDay {
  date: Date;
  avgTemp: number;
}
 
@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, DatePipe],
  templateUrl: './weather.html',
  styleUrls: ['./weather.scss']  // optional, if you have CSS
})
export class Weather implements OnInit {
  city = 'Bengaluru';
  currentWeather: any = null;
  forecastDays: ForecastDay[] = [];
  loading = false;
  error: string | null = null;
 
  private citySubject = new Subject<string>();
 
  constructor(private weatherService: WeatherService) {}
 
  ngOnInit(): void {
    this.citySubject
      .pipe(
        debounceTime(500),
        switchMap((city) => {
          this.loading = true;
          this.error = null;
          return this.weatherService.getCurrentWeather(city).pipe(
            catchError(err => {
              console.error('Current weather error:', err);
              this.error = 'Failed to fetch current weather';
              this.loading = false;
              return of(null);
            })
          );
        })
      )
      .subscribe((current) => {
        if (!current) {
          this.currentWeather = null;
          this.forecastDays = [];
          return;
        }
        this.currentWeather = current;
        this.loadForecast(this.city);
      });
 
    // initial load
    this.citySubject.next(this.city);
  }
 
  onCityChange(city: string): void {
    this.city = city;
    this.citySubject.next(city);
  }
 
  loadForecast(city: string): void {
    this.weatherService.getForecast(city).pipe(
      catchError(err => {
        console.error('Forecast error:', err);
        this.error = 'Failed to fetch forecast';
        this.loading = false;
        return of(null);
      })
    ).subscribe((res: any) => {
      if (!res || !res.list) {
        this.forecastDays = [];
        this.loading = false;
        return;
      }
      const daysMap = new Map<string, number[]>();
      res.list.forEach((item: any) => {
        const dt = item.dt;
        const date = new Date(dt * 1000);
        const dayStr = date.toISOString().split('T')[0];
        if (!daysMap.has(dayStr)) {
          daysMap.set(dayStr, []);
        }
        daysMap.get(dayStr)!.push(item.main.temp);
      });
 
      this.forecastDays = [];
      Array.from(daysMap.entries()).slice(0, 7).forEach(([dateStr, temps]) => {
        const avg = temps.reduce((a, b) => a + b, 0) / temps.length;
        this.forecastDays.push({
          date: new Date(dateStr),
          avgTemp: +avg.toFixed(1)
        });
      });
      this.loading = false;
    });
  }
 
  retry(): void {
    this.error = null;
    this.citySubject.next(this.city);
  }
}
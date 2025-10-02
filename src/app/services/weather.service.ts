import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';  // <-- replace with your actual key
 
@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private http: HttpClient) {}
 
  getCurrentWeather(city: string): Observable<any> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
    return this.http.get<any>(url);
  }
 
  getForecast(city: string): Observable<any> {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
    return this.http.get<any>(url);
  }
}
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private http = inject(HttpClient);
  private apiKey = environment.METEO_API_KEY;
  private apiUrl = environment.apiUrl;

  getWeatherByCity(city: string): Observable<any> {
    const url = `${this.apiUrl}/weather?q=${city},SN&appid=${this.apiKey}&units=metric&lang=fr`;
    return this.http.get(url);
  }
}
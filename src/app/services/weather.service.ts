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

  // 1. Méthode pour la météo actuelle
  getWeatherByCity(city: string): Observable<any> {
    const url = `${this.apiUrl}/weather?q=${city},SN&appid=${this.apiKey}&units=metric&lang=fr`;
    return this.http.get(url);
  }

  // 2. Méthode pour les prévisions à 5 jours
  getForecastByCity(city: string): Observable<any> {
    const url = `${this.apiUrl}/forecast?q=${city},SN&appid=${this.apiKey}&units=metric&lang=fr`;
    return this.http.get(url);
  }
}
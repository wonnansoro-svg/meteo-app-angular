import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; <!--  Ajout obligatoire pour utiliser "date" dans le  -->
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('meteo-app');
  
  weatherData = signal<any>(null); 
  forecastData = signal<any>(null);
  cityToSearch = 'Dakar'; 
  errorMessage = signal<string | null>(null);

  private weatherService = inject(WeatherService);

  ngOnInit() {
    this.fetchWeather(this.cityToSearch);
  }

  fetchWeather(city: string) {
    this.weatherData.set(null); 
    this.forecastData.set(null);
    this.errorMessage.set(null);

    // Appel Météo Actuelle
    this.weatherService.getWeatherByCity(city).subscribe({
      next: (data: any) => {
        this.weatherData.set(data);
      },
      error: (err: any) => {
        console.error('Erreur API:', err);
        if (err.status === 404) {
          this.errorMessage.set(`Oups ! La ville "${city}" est introuvable. Vérifiez l'orthographe.`);
        } else {
          this.errorMessage.set("Problème de réseau ou erreur de l'API. Veuillez réessayer plus tard.");
        }
      }
    });

    // Appel Prévisions
    this.weatherService.getForecastByCity(city).subscribe({
      next: (data: any) => {
        
        const dailyForecast = data.list.filter((f: any) => f.dt_txt.includes("12:00:00"));
        this.forecastData.set(dailyForecast);
      },
      error: (err: any) => console.error('Erreur prévisions:', err)
    });
  }

  onSearch() {
    if (this.cityToSearch.trim()) {
      this.fetchWeather(this.cityToSearch);
    }
  }
}
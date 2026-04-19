import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('meteo-app');
  weatherData = signal<any>(null); 
  cityToSearch = 'Dakar'; 
  
  // 1. Nouveau signal pour stocker le message d'erreur
  errorMessage = signal<string | null>(null);

  private weatherService = inject(WeatherService);

  ngOnInit() {
    this.fetchWeather(this.cityToSearch);
  }

  // ... imports existants

export class App implements OnInit {
  // ... signaux existants
  forecastData = signal<any>(null); // Pour stocker les prévisions

  // ... inject, etc.

  fetchWeather(city: string) {
    this.weatherData.set(null);
    this.forecastData.set(null); // On réinitialise aussi les prévisions
    this.errorMessage.set(null);

    // 1. Appel météo actuelle
    this.weatherService.getWeatherByCity(city).subscribe({
      next: (data: any) => this.weatherData.set(data),
      error: (err: any) => this.handleError(err, city)
    });

    // 2. Appel prévisions
    this.weatherService.getForecastByCity(city).subscribe({
      next: (data: any) => {
        // On ne garde que 5 résultats (par exemple un par jour à midi)
        // L'API renvoie 40 points (8 par jour). On filtre pour simplifier :
        const dailyForecast = data.list.filter((f: any) => f.dt_txt.includes("12:00:00"));
        this.forecastData.set(dailyForecast);
      },
      error: (err: any) => console.error('Erreur prévisions:', err)
    });
  }

  // Petite fonction utilitaire pour l'erreur
  private handleError(err: any, city: string) {
    if (err.status === 404) {
      this.errorMessage.set(`La ville "${city}" est introuvable.`);
    } else {
      this.errorMessage.set("Erreur de connexion à l'API.");
    }
  }
  
  // ... reste du code
}

  onSearch() {
    if (this.cityToSearch.trim()) {
      this.fetchWeather(this.cityToSearch);
    }
  }
}
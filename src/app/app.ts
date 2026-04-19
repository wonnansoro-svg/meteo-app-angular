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

  fetchWeather(city: string) {
    this.weatherData.set(null); 
    this.errorMessage.set(null); // 2. On efface les anciennes erreurs à chaque recherche

    this.weatherService.getWeatherByCity(city).subscribe({
      next: (data: any) => {
        this.weatherData.set(data);
      },
      error: (err: any) => {
        console.error('Erreur API:', err);
        // 3. On vérifie le type d'erreur renvoyé par l'API
        if (err.status === 404) {
          this.errorMessage.set(`Oups ! La ville "${city}" est introuvable. Vérifiez l'orthographe.`);
        } else {
          this.errorMessage.set("Problème de réseau ou erreur de l'API. Veuillez réessayer plus tard.");
        }
      }
    });
  }

  onSearch() {
    if (this.cityToSearch.trim()) {
      this.fetchWeather(this.cityToSearch);
    }
  }
}
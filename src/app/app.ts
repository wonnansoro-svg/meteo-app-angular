import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JsonPipe } from '@angular/common'; // Pour afficher du JSON brut
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('meteo-app');
  
  // Signal pour stocker les données reçues
  weatherData = signal<any>(null); 
  
  // Injection du service météo
  private weatherService = inject(WeatherService);

  ngOnInit() {
    // Appel à l'API pour la ville de Dakar au démarrage
    this.weatherService.getWeatherByCity('Dakar').subscribe({
      next: (data) => {
        console.log('Succès API:', data);
        this.weatherData.set(data);
      },
      error: (err) => console.error('Erreur API:', err)
    });
  }
}
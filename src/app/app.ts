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
    this.weatherService.getWeatherByCity('Dakar').subscribe({
      // On ajoute ": any" à data
      next: (data: any) => {
        console.log('Succès API:', data);
        this.weatherData.set(data);
      },
      // On ajoute ": any" à err (ou : Error)
      error: (err: any) => console.error('Erreur API:', err)
    });
  }
}
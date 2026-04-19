import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; // <-- 1. Importation indispensable pour la recherche
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule], // <-- 2. Ajout dans les imports
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('meteo-app');
  weatherData = signal<any>(null); 
  
  // 3. Variable liée à notre barre de recherche
  cityToSearch = 'Dakar'; 

  private weatherService = inject(WeatherService);

  ngOnInit() {
    // Au démarrage, on cherche la ville par défaut
    this.fetchWeather(this.cityToSearch);
  }

  // 4. Fonction centralisée pour faire l'appel API
  fetchWeather(city: string) {
    this.weatherData.set(null); // Optionnel: vide les données pour afficher le chargement
    this.weatherService.getWeatherByCity(city).subscribe({
      next: (data: any) => {
        this.weatherData.set(data);
      },
      error: (err: any) => {
        console.error('Erreur API:', err);
        // (La gestion propre de cette erreur sera le but du Sprint 3 !)
      }
    });
  }

  // 5. Fonction déclenchée par le bouton "Rechercher"
  onSearch() {
    if (this.cityToSearch.trim()) { // On vérifie que le champ n'est pas vide
      this.fetchWeather(this.cityToSearch);
    }
  }
}
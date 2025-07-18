import { Component } from '@angular/core';
import { Coffee } from '../../logic/Coffee';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';  
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { GeolocationService } from '../geolocation.service';
import { DataService } from '../data.service';
import { TastingRating } from '../../logic/TastingRating';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-coffee',
  standalone: true,
  imports: [MatCardModule,MatFormFieldModule,MatSlideToggleModule, MatIconModule ,MatSliderModule, FormsModule, MatInputModule,MatSelectModule, MatButtonModule],
  templateUrl: './coffee.component.html',
  styleUrl: './coffee.component.scss',
  providers:[
    DataService
  ]
})
export class CoffeeComponent {
  
  coffee = new Coffee();
  types = ["Espresso", "Ristretto", "Americano", "Cappuccino", "Frappe"]
  tastingEnabled = false;

  constructor(private geolocation: GeolocationService) {}

  tastingRatingChanged(checked: boolean) {
    if (checked) {
      this.coffee.tastingRating = new TastingRating();
    } else {
      this.coffee.tastingRating = null;
    }
  }

  acquireLocation() {
    this.geolocation.requestLocation( (location: GeolocationCoordinates | null) => {
      if (location) {
        this.coffee.location!.latitude = location.latitude;
        this.coffee.location!.longitude = location.longitude;
      }
    })
  }

  cancel() {

  }

  save() {

  }
}
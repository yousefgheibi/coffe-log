import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { UiService } from '../ui.service';

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
export class CoffeeComponent implements OnInit{
  
  coffee = new Coffee();
  types = ["Espresso", "Ristretto", "Americano", "Cappuccino", "Frappe"]
  tastingEnabled = false;
  formType : "editing" | "inserting" = "inserting";

  constructor(private geolocation: GeolocationService,
    private  data: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private ui: UiService
  ) {}

  ngOnInit(): void {
    this.ui.setTitle("New");
    this.ui.setThemeColor('brown');
    this.route.params.subscribe(params => {
      if (params["id"]) {
        this.data.get(params["id"], (response: any) => {
          this.coffee = response; // TODO: convert the object to a Coffee instance
          this.formType = "editing";
          if (this.coffee.tastingRating) {
            this.tastingEnabled = true
          }
        })
      }
    })
  }

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
    this.router.navigate(["/"])
  }

  save() {
    let resultFunction = (result: boolean) => {
      if (result) {
        this.router.navigate(["/"]);
      } else {
        // TODO: render a nice error message
      }
    }
 
    if (this.formType=="inserting") {
      let { id, ...insertedCoffee} = this.coffee;
      this.data.save(insertedCoffee, resultFunction);
    } else {
      this.data.save(this.coffee, resultFunction);
    }
  }
}

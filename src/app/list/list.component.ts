import { Component, OnInit } from '@angular/core';
import { Coffee } from '../../logic/Coffee';
import { DataService } from '../data.service';
import { JsonPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { GeolocationService } from '../geolocation.service';
import { UiService } from '../ui.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [JsonPipe, MatCardModule, MatButtonModule, MatIconModule,RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  list: Coffee[] = [];
  constructor(private data: DataService, private router: Router, private geolocation: GeolocationService,
     private ui: UiService
  ) {}

  ngOnInit(): void {
    this.data.getList((list: Coffee[]) => {
      this.list = list;
    });
    this.ui.setTitle("Coffees");
    this.ui.setThemeColor('orange');
  }

  goDetails(coffee: Coffee) {
    this.router.navigate(['/coffee', coffee.id]);
  }

   goMap(coffee: Coffee) {
    const mapURL = this.geolocation.getMapLink(coffee.location!);
    window.open(mapURL, "_blank");
   }

   share(coffee: Coffee) {
    const text = `I had this coffee at ${coffee.place} and for me it's ${coffee.rating} stars.`
    const info = {
      title: coffee.name,
      text: text,
      url: window.location.href
    }

    if ('share' in navigator && navigator.canShare(info)) {
      navigator.share(info)
    } else {
      // TODO: show a message
    }
   }
}

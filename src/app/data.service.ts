import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public endpoint = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getList(callback: Function) {
    // const list = [
    //   new Coffee("1", "Double Espresso", "Cafe Tortoni", new PlaceLocation("Av. de Mayo 600", "Buenos Aires")),
    //   new Coffee("2", "Honey Americano", "Starcoffee", new PlaceLocation("Gran Via 34", "Madrid"))
    // ];
    // callback(list);
    this.httpClient
      .get(`${this.endpoint}/coffees`)
      .subscribe((response) => callback(response));
  }

  get(coffeeId: string, callback: Function) {
    this.httpClient
      .get(`${this.endpoint}/coffees/${coffeeId}`)
      .subscribe((response) => callback(response));
  }

  save(coffee: any, callback: Function) {
    if (coffee.id) {
      this.httpClient
        .put(`${this.endpoint}/coffees/${coffee.id}`, coffee)
        .subscribe((response) => callback(true));
    } else {
      // It's a new item
      this.httpClient
        .post(`${this.endpoint}/coffees`, coffee)
        .subscribe((response) => callback(true));
    }
  }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RestaurantModel } from './models/restaurants-model';
import { DataService } from '../services/data.service';
import { RestaurantComponent } from './restaurant/restaurant.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RestaurantComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  restaurants: RestaurantModel[] = [];
  modify: RestaurantModel | undefined = undefined;
  new: RestaurantModel | undefined = undefined;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getRestaurants().subscribe({
      next: (data: RestaurantModel[]) => {
        this.restaurants = data;
      },

      error: (err) => console.log(err)

    });
  }

  newRest() {
    this.new = {
      id: undefined,
      restaurantName: '',
      category: '',
      capacity: 30,
      restaurantOwner: '',
      ownerEmail: '',
      ownerBirthDate: ''
    }
  }

  saveNew(rest: RestaurantModel){
    this.dataService.addRestaurant(rest).subscribe({
      next: (data: RestaurantModel) =>{
        this.restaurants.push(data);
        this.new = undefined;
      },
      error: (err) => console.log(err)
    });
  }
  
  modifyRest(rest: RestaurantModel) {
    this.modify = JSON.parse(JSON.stringify(rest));
  }

  deleteRest(rest: RestaurantModel) {
    this.dataService.deleteRestaurant(rest).subscribe({
      next: (data: RestaurantModel) =>{
        const index = this.restaurants.findIndex(r => r.id == data.id);
        this.restaurants.splice(index, 1);
      },
      error: (err) => console.log(err)
    });
  }

  saveModified(rest: RestaurantModel){
    this.dataService.modifyRestaurant(rest).subscribe({
      next: (data: RestaurantModel) =>{
        const index = this.restaurants.findIndex(r => r.id == data.id);
        this.restaurants[index] = data;
        this.modify = undefined;
      },
      error: (err) => console.log(err)
    });
  }
}

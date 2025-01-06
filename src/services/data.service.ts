import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestaurantModel } from '../app/models/restaurants-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = "http://localhost:3000/restaurants"
  constructor(private http: HttpClient) { }

  getRestaurants(): Observable<RestaurantModel[]> {
    return this.http.get<RestaurantModel[]>(this.url);
  }

  addRestaurant(rest: RestaurantModel): Observable<RestaurantModel> {
   return this.http.post<RestaurantModel>(this.url, rest);
  }

  modifyRestaurant(rest: RestaurantModel): Observable<RestaurantModel> {
    return this.http.put<RestaurantModel>(`${this.url}/${rest.id}`, rest);
  }

  deleteRestaurant(rest: RestaurantModel): Observable<RestaurantModel> {
    return this.http.delete<RestaurantModel>(`${this.url}/${rest.id}`);
  }
}

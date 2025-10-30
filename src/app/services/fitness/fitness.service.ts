import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { DailySummaryModel, MealModel, MealResponseModel } from '../../Models/meal.model';
@Injectable({
  providedIn: 'root'
})
export class FitnessService {

  constructor(private http: HttpClient) { }

  private apiUrl= environment.baseUrl + '/fitness';

  fetchMealsForDay(date:string): Observable<MealResponseModel[]> {
    return this.http.get<MealResponseModel[]>(this.apiUrl + `/fetchMealsForDay?date=${date}`);
  }

  fetchDailySummary(date:string): Observable<DailySummaryModel> {
    return this.http.get<DailySummaryModel>(this.apiUrl + `/fetchDailySummary?date=${date}`);
  }

  addMeal(meal:MealModel): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/meal', meal);
  }
}

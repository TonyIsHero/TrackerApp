import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

export interface mealData{
  mealname: string,
  carbs: number,
  proteins: number,
  fats: number,
  fibre: number,
  calories: number
}

@Injectable({
  providedIn: 'root'
})

export class SharedserviceService {

  private mealDataSource = new BehaviorSubject<mealData|null>(null);
  mealData$: Observable<mealData|null> = this.mealDataSource.asObservable();

  updateMealData(data: mealData) {
    this.mealDataSource.next(data);
  }

  getCurrentMealData(): mealData | null {
    return this.mealDataSource.getValue();
  }
  
}

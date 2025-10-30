import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AgChartsModule } from 'ag-charts-angular';
import { AgChartOptions, AgCharts} from 'ag-charts-enterprise';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import  HighchartsChartModule, { HighchartsChartComponent }  from 'highcharts-angular';
import Highcharts from 'highcharts';
import { text } from 'stream/consumers';
import { SharedserviceService } from '../../Shared/services/sharedservice.service';
import { DailySummaryModel, MealModel, MealResponseModel } from '../../Models/meal.model';
import { FitnessService } from '../../services/fitness/fitness.service';

@Component({
  selector: 'app-fitness',
  imports: [CommonModule, ReactiveFormsModule, AgChartsModule, HighchartsChartComponent],
  templateUrl: './fitness.component.html',
  styleUrl: './fitness.component.css',
  
})
 export class FitnessComponent implements OnInit {

  chartOptionsDO: Highcharts.Options = {};
  chartOptionsTC: Highcharts.Options = {};
  Highcharts: typeof Highcharts = Highcharts;
  greetingMessage='';
  messageLine='';
  username=sessionStorage.getItem('Name') || 'User';
  userId = sessionStorage.getItem('userId') ? +sessionStorage.getItem('userId')! : null;
  mealForm!: FormGroup;
  anyMealAdded: boolean = false;
  aiMode:boolean = false;
  currentTime='';
  private timeInterval:any;
  dailyOverview : { name: string; value: number }[] = []
  totalCalories: number = 0;
  todayDate: string =''; // YYYY-MM-DD formatS
  mealResponse: MealResponseModel[] = [];

  ngOnInit(): void {
    this.mealForm = this.fb.group({mealname:[null],carbs:[null], proteins:[null], fats:[null], fibre:[null], calories:[null]});
    // Get local date in Indian timezone (IST) - will show October 30th correctly
    this.todayDate = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD format in local timezone
    console.log('Today Date (Local IST):', this.todayDate);
    this.fetchDailySummary();
    this.fetchMealsForDay();
    this.checkTimeBasedGreeting();
    this.updateClock();
    this.timeInterval = setInterval(() => this.updateClock(), 1000);
  }

  constructor(private fb: FormBuilder, 
    private sharedService: SharedserviceService,
    private fitnessService: FitnessService ){}

  updateClock() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
    // console.log('Current Time:', this.currentTime);
  }

  fetchMealsForDay(){
    this.fitnessService.fetchMealsForDay(this.todayDate).subscribe({
      next:(meals)=>{
        console.log('Meals for today:', meals);
        if(meals && meals.length > 0) {
          this.mealResponse = meals || [];
        }
      },
      error:(err)=>{
        alert('Error fetching meals: ' + err.message);
        this.mealResponse = [];
      }
    });
  }

  fetchDailySummary(){
    this.fitnessService.fetchDailySummary(this.todayDate).subscribe({
      next:(summary)=>{
        if( summary.calories) {
          this.anyMealAdded = true;
          console.log(this.anyMealAdded);
          console.log('Daily Summary for today:', summary);
          this.dailyOverview = [
            { name: 'Carbohydrates', value: summary.carbs || 0 },
            { name: 'Proteins', value: summary.proteins || 0 },
            { name: 'Fats', value: summary.fats || 0 }
          ];
        console.log('Daily Overview Data:', this.dailyOverview);
        this.totalCalories = summary.calories || 0;
        this.updateChartTC();
        this.updateChartDO();
      }
      }
     });
  }
  checkTimeBasedGreeting() {
    const currentHour = new Date().getHours();
    if(currentHour < 12) {
      this.greetingMessage = 'Good Morning '+this.username+  '!';
      this.messageLine = 'Start your day with a healthy meal';
    } else if(currentHour < 18) {
      this.greetingMessage = 'Good Afternoon ' +this.username+ '!';
      this.messageLine = 'Keep up the energy with a nutritious lunch';
    } else {
      this.greetingMessage = 'Good Evening '+  this.username+'!';
      this.messageLine = 'Wind down with a light dinner';
    }
  }
  toggleMealInputMode(mode:'ai' | 'manual')
    {
      this.aiMode = (mode === 'ai');
    }

  updateChartDO(){
    this.chartOptionsDO={
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      height: 350,
      width: 550,
    },
    title:{
      text: 'Macronutrient Distribution',
      align: 'left',
      verticalAlign: 'bottom',
      style: { color: '#5a6b45', fontSize: '18px',fontWeight: 'bold' },
    },
    plotOptions: {
      pie: {
        innerSize: '0%',
        dataLabels: { enabled: true, format: '{point.name}' ,
        style: { color: '#f8faf7', fontSize: '14px',},   
      },
      
    borderWidth: 0,
    },
  },
    series: [
      {  
      type: 'pie',
      name: 'Macronutrients',
      data: this.dailyOverview.map(item => ({
        name: item.name, 
        y: item.value,
        color: item.name === 'Carbohydrates' ? '#8da67e' :
               item.name === 'Proteins' ? '#5a6b45' :
               item.name === 'Fats' ? '#F5F5DC' : '#8085e9',
       })),
    },],
    tooltip: {pointFormat: '{point.name}: <b>{point.y}</b>'},
    legend: {enabled: true,
      itemStyle: { color: '#f8faf7', fontSize: '14px',},
    },
    credits: {enabled: false},
  };
  }

  updateChartTC(){
    this.chartOptionsTC={
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      height: 200,
      width: 200,
    },  
    title: {
      text: `${this.totalCalories} kcal`,
      align: 'center',
      verticalAlign: 'middle',
      style: { color: '#5a6b45', fontSize: '14px',fontWeight: 'bold' },
    },
    plotOptions: {
      pie: {
        innerSize: '0%',
        dataLabels: { enabled: false },
        borderWidth: 0,
      },
    },
    series: [{
      type: 'pie',
      data:[
        { name: 'Calories', y: 1, color: '#c7d4b4' },
      ],
      },],
    tooltip: {enabled: false},
    legend: {enabled: false},
    credits: {enabled: false},
  };
  }

  onSubmitMealForm(){
    if(this.mealForm.valid){
      const meal : MealModel={
        userId: this.userId!,
        meal_name: this.mealForm.value.mealname,
        carbs: this.mealForm.value.carbs,
        proteins: this.mealForm.value.proteins,
        fats: this.mealForm.value.fats,
        fibre: this.mealForm.value.fibre,
        calories: this.mealForm.value.calories, 
      }

      this.fitnessService.addMeal(meal).subscribe({
        next:(res)=>{
          alert(res.message);
          // ✅ Refresh data AFTER meal is successfully saved
          this.fetchDailySummary();
          this.fetchMealsForDay(); 
          this.mealForm.reset();
        },
        error:(err)=>{
          alert(err.error.message);
        }
      });
    } else {
      alert('Please fill out the form correctly before submitting.');
      this.mealForm.markAllAsTouched();
   }
  }
}

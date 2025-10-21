import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit,Inject, PLATFORM_ID} from '@angular/core';
import { AgChartsModule } from 'ag-charts-angular';
import { AgChartOptions, AgCharts} from 'ag-charts-enterprise';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import  HighchartsChartModule, { HighchartsChartComponent }  from 'highcharts-angular';
import Highcharts from 'highcharts';
import { text } from 'stream/consumers';

@Component({
  selector: 'app-fitness',
  imports: [CommonModule, ReactiveFormsModule, AgChartsModule, HighchartsChartComponent],
  templateUrl: './fitness.component.html',
  styleUrl: './fitness.component.css',
  
})
 export class FitnessComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  greetingMessage='';
  messageLine='';
  username='Sabarno';
  mealForm!: FormGroup;
  anyMealAdded: boolean = false;
  aiMode:boolean = false;
  currentTime='';
  private timeInterval:any;
  macrosData : { name: string; value: number }[] = []
  totalCalories: number = 0;

  ngOnInit(): void {
    this.checkMealAdded();
    this.checkTimeBasedGreeting();
    if(isPlatformBrowser(this.platformId)){
      this.updateClock();
    this.timeInterval = setInterval(() => this.updateClock(), 1000);
    }
  }

  constructor(private fb: FormBuilder, @Inject(PLATFORM_ID) private platformId: Object)
  {
  this.mealForm = this.fb.group({
    carbs: [null,[Validators.required, Validators.min(0)]],
    proteins: [null,[Validators.required, Validators.min(0)]],
    fats: [null,[Validators.required, Validators.min(0)]],
    fibre: [null,[Validators.required, Validators.min(0)]],
    calories: [null,[Validators.required, Validators.min(0)]]
  });
  }

  updateClock() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
    // console.log('Current Time:', this.currentTime);
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
  checkMealAdded(){
    this.anyMealAdded = this.macrosData.length > 0;
    console.log('Any Meal Added:', this.anyMealAdded);
  }
  toggleMealInputMode(mode:'ai' | 'manual')
    {
      this.aiMode = (mode === 'ai');
    }

  onSubmitMealForm(){
    if(this.mealForm.valid){
      const mealData = this.mealForm.value;
      console.log('Meal Data Submitted:', mealData);
      this.macrosData = [
        { name: 'Carbohydrates', value: mealData.carbs },
        { name: 'Proteins', value: mealData.proteins },
        { name: 'Fats', value: mealData.fats },];
      this.totalCalories = mealData.calories;
      
      this.totalcalorieschart = {
        ...this.totalcalorieschart,
        title: {
          text: `${this.totalCalories} kcal`,
          align: 'center',
          verticalAlign: 'middle',
          y: 6,
          style: { color: '#f8faf7', fontSize: '18px',fontWeight: 'bold' },
        },
      };

      this.dayoverviewchart = {
        ...this.dayoverviewchart,
        series: [
      {  
      type: 'pie',
      name: 'Macronutrients',
      data: this.macrosData.map(item => ({ 
        name: item.name, 
        y: item.value,
        color: item.name === 'Carbohydrates' ? '#8da67e' :
               item.name === 'Proteins' ? '#5a6b45' :
               item.name === 'Fats' ? '#AC9362' : '#8085e9',
       })),
    },],
      };
      // Further processing can be done here  
      this.mealForm.reset();
      this.checkMealAdded();
    } else {
      alert('Please fill out the form correctly before submitting.');
      this.mealForm.markAllAsTouched();
   }
  }
  
  // Chart Sections  
  dayoverviewchart: Highcharts.Options={
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
      data: this.macrosData.map(item => ({ 
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
    
  // total calories consumed pie chart

  totalcalorieschart: Highcharts.Options={
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
      style: { color: '#f8faf7', fontSize: '14px',fontWeight: 'bold' },
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

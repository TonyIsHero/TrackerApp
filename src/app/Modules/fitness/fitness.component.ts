import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fitness',
  imports: [CommonModule,
  ],
  templateUrl: './fitness.component.html',
  styleUrl: './fitness.component.css'
})
export class FitnessComponent {

  carbohydrateIntake: number = 50;
  proteinIntake: number = 20;
  fatIntake: number = 10; 
}

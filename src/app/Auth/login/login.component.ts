import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  constructor(private fb:FormBuilder){}
  loginForm!: FormGroup;
  
  ngOnInit(): void{
    this.loginForm = this.fb.group({email:[null],password:[null]});
  }

  onSubmit(){
    alert('Logged In Successfully');
  }
}

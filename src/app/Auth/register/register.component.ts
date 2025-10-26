import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private fb:FormBuilder){}
  userForm!: FormGroup;
  
  ngOnInit(): void{
    this.userForm = this.fb.group({email:[null],password:[null]});
  }

  onSubmit(){
    alert('Signed Up Successfully');
  }

}

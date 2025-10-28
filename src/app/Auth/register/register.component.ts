import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private fb:FormBuilder, private authService:AuthService, private router:Router){}
  userForm!: FormGroup;
  
  // Custom validator to check if passwords match
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (!password || !confirmPassword) {
      return null;
    }
    
    return password.value !== confirmPassword.value ? { passwordMismatch: true } : null;
  }
  
  ngOnInit(): void{
    this.userForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(2)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  // Helper method to check if passwords match
  get passwordsMatch(): boolean {
    return !this.userForm.hasError('passwordMismatch');
  }

  // Helper method to get form control errors
  getFieldError(fieldName: string): string {
    const field = this.userForm.get(fieldName);
    if (field?.touched && field?.errors) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Invalid email format';
      if (field.errors['minlength']) return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
    }
    return '';
  }

  onSubmit(){
    if(this.userForm.valid){
      // Extract only the fields needed for the backend
      const registerData = {
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        password: this.userForm.value.password
      };
      
      this.authService.register(registerData).subscribe({
        next:(res)=>{
          alert(res.message);
          this.userForm.reset();
          this.router.navigate(['dashboard']);
        },
        error:(err)=>{
          alert(err.error.message);
        }
      });
    }
  }
}

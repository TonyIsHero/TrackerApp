import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent {

  bottomMessage='New User, click here to register';
  newUser : true | false = false; // user is registered
  activeSection: 'login'|'register'='login'; //active section is login
  constructor(private router:Router){}
  
  toggle()
  {
    this.newUser=!this.newUser;
    this.activeSection=this.newUser?'register':'login';
    this.bottomMessage = this.newUser?'Already an user, proceed here to login':'New User, click here to register';
    this.router.navigate([`/auth/${this.activeSection}`]);
  }
}

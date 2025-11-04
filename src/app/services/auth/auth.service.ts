import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.baseUrl + '/auth';

  constructor(private http: HttpClient) { }

  register(data:any):Observable<any>{
    return this.http.post(this.apiUrl + '/register', data).pipe(
      tap((response:any) => {
        if(response.token){
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('Name', response.name);
          sessionStorage.setItem('userId', response.userId);
        }
      })
    );
}

  login(data:any):Observable<any>{
    return this.http.post(this.apiUrl + '/login', data).pipe(
      tap((response:any) => {
        if(response.token){
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('Name', response.name);
          sessionStorage.setItem('userId', response.userId);
        }
      })
    );
  }

  logout():void{
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('Name'); 
    sessionStorage.removeItem('userId'); // Also remove userId
  }
  
  isLoggedIn():boolean{
    return !!sessionStorage.getItem('token');
  }

  getToken():string | null{
    return sessionStorage.getItem('token');
  }

  // Username methods
  getUserName(): string | null{
    return sessionStorage.getItem('Name');
  }

  getUserId(): number | null{ 
    const userId = sessionStorage.getItem('userId');
    return userId ? +userId : null;
  }

  //  default username and password for testing
  //  {
  //     "email": "sabarno@example.com",
  //      "password": "mypassword123"
  // }
}

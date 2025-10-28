import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
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
        }
      })
    );
}

  login(data:any):Observable<any>{
    return this.http.post(this.apiUrl + '/login', data).pipe(
      tap((response:any) => {
        if(response.token){
          sessionStorage.setItem('token', response.token);
        }
      })
    );
  }

  logout():void{
    sessionStorage.removeItem('token');
  }
  
  isLoggedIn():boolean{
    return !!sessionStorage.getItem('token');
  }

  getToken():string | null{
    return sessionStorage.getItem('token');
  }
}

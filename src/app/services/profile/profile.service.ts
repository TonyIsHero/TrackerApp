import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../../Models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = environment.baseUrl+'/profile';

  constructor(private http: HttpClient) { }
  
  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.apiUrl + '/fetch');
  }

  saveUserProfile(profileData: any): Observable<any> {
    return this.http.post(this.apiUrl + '/save', profileData, { 
      responseType: 'text' 
    });
  }
}

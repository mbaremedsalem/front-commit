import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/gs-api/src/base/base-auth';
import { LoginResponse } from 'src/gs-api/src/models/login-dto';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient, ) { }
  private apiUrl = `${API_BASE_URL}token/`;
  login(credentials: any): Observable<LoginResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    return this.http.post<LoginResponse>(this.apiUrl, credentials, httpOptions);
    
  }
}

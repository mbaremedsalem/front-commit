import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE } from 'src/gs-api/src/base/base-auth';

@Injectable({
  providedIn: 'root'
})
export class CommiteService {


  
  private apiUrl = 'http://127.0.0.1:8000/api/generate-qr/';

  constructor(private http: HttpClient) { }

  generateQrCode(ssid: string, password: string, encryption: string): Observable<Blob> {
    const body = { ssid, password, encryption };
    return this.http.post(this.apiUrl, body, { responseType: 'blob' });
  }

  getCommits(): Observable<any[]> {
    // Vous devez ajouter le jeton d'authentification ici si nécessaire
    const headers = new HttpHeaders().set('Authorization', 'Bearer '+localStorage.getItem('access'));

    return this.http.get<any[]>(`${API_BASE}commits/`, { headers });
  }

  getTransfer(): Observable<any[]> {
    // Vous devez ajouter le jeton d'authentification ici si nécessaire
    const headers = new HttpHeaders().set('Authorization', 'Bearer '+localStorage.getItem('access'));

    return this.http.get<any[]>(`${API_BASE}commits/`, { headers });
  }

  addCommite(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer '+localStorage.getItem('access')
    });

    // Make a POST request to create the document
    return this.http.post(`${API_BASE}commite/new/`, formData, {
      headers: headers
    });
  }

  deleteCommite(commiteId: number) {
    const url = `${API_BASE}commite/${commiteId}/delete/`;

    // Set up headers with the authorization token
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+localStorage.getItem('access')
    });

    // Send a DELETE request to the API
    this.http.delete(url, { headers }).subscribe(
      () => {
        // Document deleted successfully, handle any further actions
        console.log('delete success')
        window.location.reload();
         // Reload the current page by navigating to the same route
      // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      // this.router.onSameUrlNavigation = 'reload';
      // this.router.navigate([this.router.url]);
      },
      (error: any) => {
        console.error('Error deleting document:', error);
        // Handle the error, display a message, etc.
      }
    );
  }


  remonteCommits(commiteId: number): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer '+localStorage.getItem('access'));
    const body = {
      commite_id: commiteId,
      nouvel_utilisateur_id: localStorage.getItem('id')
    };
    return this.http.post<any[]>(`${API_BASE}remonter-commite/`,body, { headers });
  }
}

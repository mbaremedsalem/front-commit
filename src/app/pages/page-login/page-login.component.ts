import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service/login-service.service';
import { LoginResponse } from 'src/gs-api/src/models/login-dto';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent {
  loginInProgress = false;
  credentials = { username: '', password: '' };
  message: string | undefined;
  errorMessage: string | undefined;
  showErrorMessage: boolean = false;

  constructor(private _snackBar: MatSnackBar,private apiService: LoginServiceService, private router: Router) {}

  login() {
    this.loginInProgress = true; 
    this.apiService.login(this.credentials).subscribe(
     (response: LoginResponse) => {
       if (response.status === 200) {
         // Login success
         this.message = response.message;
         // Store the access token in local storage or a cookie
         if(response.role==='Validateur'){
 
           localStorage.setItem('access', response.access);  
           localStorage.setItem('id', response.id.toString());  
           
           // Redirect to the home page
           this.router.navigate(['/statistique']);
         }
         else if(response.role==='Createur')
         {
          // Redirect to the home manager page
          localStorage.setItem('access', response.access);
          localStorage.setItem('id', response.id.toString());  
          
          this.router.navigate(['/statistique']);
       }
         else 
         {
           // Handle the case where response.access is undefined
           console.error('Access token is undefined.');
         }
       }
       else
       {
         this.message = response.message;
         this.showErrorMessage = true;
         if (this.message) {
          //  this.showErrorAlert(this.message.slice(33, 56));
         }
       }
     },
     (error) => {
       // Login error
       this.message = 'Informations invalides';
     }
   ).add(() => {
     this.loginInProgress = false; // Set to false after login completes (whether success or error)
   });
 }
//  showErrorAlert(message: string) {
//    this.errorMessage = message;
//    this._snackBar.open(message, 'Fermer', {
//      duration: 3000, // Durée d'affichage de l'alerte (3 secondes)
//    });
//  }
}

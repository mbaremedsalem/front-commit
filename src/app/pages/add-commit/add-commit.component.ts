import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommiteService } from 'src/app/services/commite-service/commite.service';

@Component({
  selector: 'app-add-commit',
  templateUrl: './add-commit.component.html',
  styleUrls: ['./add-commit.component.scss']
})
export class AddCommitComponent {
  selectedFile: File | null = null;
  loginInProgress = false;
  compte: string = '';
  client: string = '';
  nom: string = '';
  motant_credit: string = '';
  duree: string = '';
  message: string | undefined;
  errorMessage: string | undefined;
  showErrorMessage: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddCommitComponent>,
    private _snackBar: MatSnackBar,
    private commiteService: CommiteService,
  ) {}
  onSubmit() {
    // this.loginInProgress = true; 
    if (this.compte ) {
      const formData = new FormData();
      formData.append('compte', this.compte);
      formData.append('client', this.client);
      formData.append('nom', this.nom);
      formData.append('motant_credit', this.motant_credit);
      formData.append('duree', this.duree);
      if (this.selectedFile) {
        formData.append('Document', this.selectedFile);
      }
      this.loginInProgress = true; 
      // Make a POST request to your API to create the document
      this.commiteService.addCommite(formData).subscribe(response => {
        console.log('Response:', response);
        
        this.message = response.message;
          if (this.message) {
            this.showErrorAlert(this.message);
          }

        this.dialogRef.close();
        window.location.reload();
      }).add(() => {
        this.loginInProgress = false; // Set to false after login completes (whether success or error)
      });
    }
  }
  showErrorAlert(message: string) {
    this.errorMessage = message;
    this._snackBar.open(message, 'Fermer', {
      duration: 3000, // Durée d'affichage de l'alerte (3 secondes)
    });
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}

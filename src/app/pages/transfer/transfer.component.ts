import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { CommiteService } from 'src/app/services/commite-service/commite.service';
import { Router } from '@angular/router';
import { url } from 'src/gs-api/src/base/base-auth';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AddTransferComponent } from '../add-transfer/add-transfer.component';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent {
  commites: any[] = [];
  dataSource = new MatTableDataSource<any>();
  show = true;
  showButtons: boolean = false; 
  my_url!:string;

  constructor(
    private commiteService: CommiteService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog, 
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.my_url = url;
    this.commiteService.getCommits().subscribe((data: any) => {
      if (Array.isArray(data.results)) {
        this.commites = data.results;
        this.dataSource.data = this.commites; // Set the data for the Material table
    
        // Désinfecter les URLs
        this.commites.forEach(document => {
          document.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${url}${document.Document}`);
        });
      } else {
        console.error('Les données renvoyées ne sont pas un tableau:', data);
      }
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddTransferComponent, {
      
      width: '1000px',
      
      panelClass: 'custom-dialog-container',
      position: {
        left: '330px', // Ajoutez la valeur de padding-left que vous souhaitez
      },
      disableClose: true
    });
  }

  openConfirmationDialog(commiteId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        // Call the API to delete the document when the user confirms
        this.commiteService.deleteCommite(commiteId);
             
      }
    });
  }
  // remonte commit  
  onRemonteDialog(documentId: number) {
    const commiteId = documentId; // À remplacer par l'ID du document approprié

    this.commiteService.remonteCommits(commiteId).subscribe(
      (response: any) => {
        console.log('Remonté avec succès : ', response);
        // Traitez la réponse ici
      },
      error => {
        console.error('Erreur lors de la remontée : ', error);
        // Gérez l'erreur ici
      }
    );
  }

  toggleSelection(comiite: any) {
    comiite.isSelected = !comiite.isSelected;
  } 
  toggleButtons(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.showButtons = true;
    } else {
      this.showButtons = false;
    }
  }
}

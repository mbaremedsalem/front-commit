import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { CommiteService } from 'src/app/services/commite-service/commite.service';
import { AddCommitComponent } from '../../add-commit/add-commit.component';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-articles',
  templateUrl: './page-articles.component.html',
  styleUrls: ['./page-articles.component.scss']
})
export class PageArticlesComponent {
  commites: any[] = [];
  dataSource = new MatTableDataSource<any>();
  show = true;
  showButtons: boolean = false; 
  constructor(private commiteService: CommiteService,private sanitizer: DomSanitizer,public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.commiteService.getCommits().subscribe((data: any) => {
      if (Array.isArray(data.results)) {
        this.commites = data.results;
        this.dataSource.data = this.commites; // Set the data for the Material table
    
        // Désinfecter les URLs
        this.commites.forEach(document => {
          document.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`http://127.0.0.1:8000${document.Document}`);
        });
      } else {
        console.error('Les données renvoyées ne sont pas un tableau:', data);
      }
    });
  }
  openAddDialog() {
    const dialogRef = this.dialog.open(AddCommitComponent, {
      
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

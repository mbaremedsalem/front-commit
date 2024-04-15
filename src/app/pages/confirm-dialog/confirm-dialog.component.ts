import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  confirmDelete() {
    this.dialogRef.close(true); // Close the dialog and return true to indicate confirmation
  }

  cancelDelete() {
    this.dialogRef.close(false); // Close the dialog and return false to indicate cancellation
  }
}

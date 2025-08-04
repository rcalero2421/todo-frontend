/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ConfirmDialogComponent } from '@shared/index';
import { DialogService } from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root',
})
export class CustomConfirmDialogService {
  private confirmSubject = new Subject<boolean>();

  constructor(private dialogService: DialogService) {}

  confirm(message: string): Observable<boolean> {
    const dialogRef = this.dialogService.open(ConfirmDialogComponent, {
      data: { message },
      width: '400px',
      styleClass: 'custom-confirm-dialog',
    });

    dialogRef.onClose.subscribe((result: boolean) => {
      this.confirmSubject.next(result);
    });

    return this.confirmSubject.asObservable();
  }
}
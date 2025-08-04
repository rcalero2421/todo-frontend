import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private messageService: MessageService) {}

  showSuccess(message: string): void {
    this.messageService.clear();
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  showInfo(message: string): void {
    this.messageService.clear();
    this.messageService.add({
      severity: 'info',
      summary: 'Information',
      detail: message,
    });
  }

  showWarn(message: string): void {
    this.messageService.clear();
    this.messageService.add({
      severity: 'warn',
      summary: 'Warning',
      detail: message,
    });
  }

  showError(message: string): void {
    this.messageService.clear();
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }
}
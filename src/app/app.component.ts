import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from '@shared/layout/layout/layout.component';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SpinnerService } from '@core/services';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LayoutComponent,
    ToastModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './app.component.html',
  providers: [],
})
export class AppComponent {
  isLoading$ = this.spinnerService.isLoading$;

  constructor(private spinnerService: SpinnerService) {}
}
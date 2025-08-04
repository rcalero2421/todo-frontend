import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { Store } from '@ngxs/store';
import { CreateUserAction, LoginAction, UserState } from '@modules/auth/application/store/user';
import { AlertService, CustomConfirmDialogService, SpinnerService } from '@core/services';
import { Observable, delay, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
    CheckboxModule,
  ],
  providers: [AlertService],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AuthPageComponent implements OnInit {
  public form!: FormGroup;
  token$!: Observable<string>;
  currentYear!: number;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store,
    private alertService: AlertService,
    private spinner: SpinnerService,
    private confirmDialogService: CustomConfirmDialogService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.currentYear = new Date().getFullYear();
  }

  initForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      remember: [false],
    });
  }

  async onSubmit() {
    const email = this.form.value.email;
    this.spinner.show();

    try {
      await this.store.dispatch(new LoginAction(email)).toPromise();
      await delay(500);
      this.token$ = this.store.select(UserState.getToken);
      this.verifyAuthenticity();
    } catch (error: any) {
      const notFound = error?.message?.includes('User not found') || error?.status === 404;

      if (notFound) {
        this.spinner.hide();

        const confirmed = await firstValueFrom(
          this.confirmDialogService.confirm('User not found. Do you want to create an account with this email?')
        );

        if (confirmed) {
          this.spinner.show();
          try {
            await this.store.dispatch(new CreateUserAction(email)).toPromise();
            await delay(500);
            this.token$ = this.store.select(UserState.getToken);
            this.verifyAuthenticity();
          } catch (e) {
            this.spinner.hide();
            this.alertService.showError('Account creation failed');
          }
        } else {
          this.form.reset();
        }
      } else {
        this.spinner.hide();
        this.alertService.showError('Unexpected error');
      }
    }
  }

  verifyAuthenticity() {
    this.token$.subscribe(token => {
      this.spinner.hide();

      if (token) {
        this.alertService.showSuccess('Successful login');
        this.router.navigate(['/home']);
      } else {
        this.alertService.showError('Invalid credentials');
      }
    });
  }
}
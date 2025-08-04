/* eslint-disable max-len */
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessagesModule } from 'primeng/messages';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { environment } from '@environment/environment';
import { routes } from '@config/routes/app.routes';
// import { homeConfig } from '@modules/home/application/home.config';
import { DialogService } from 'primeng/dynamicdialog';
import {
  CustomConfirmDialogService,
  SpinnerService,
  FormValidationService,
} from '@core/services';

import { CustomHttpInterceptor } from '@core/interceptors/custom-http';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MenuStatusState } from '@shared/layout/application/store/menu-state';
import { MessageService } from 'primeng/api';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { authConfig } from '@modules/auth/application/auth.config';
import { layoutConfig } from '@shared/layout/application/layout.config';
import { UserState } from '@modules/auth/application/store/user';
import { taskConfig } from '@modules/task/application/task.config';
import { TaskState } from '@modules/task/application/store/task';

const SERVICES = [
  DialogService,
  CustomConfirmDialogService,
  MessageService,
  SpinnerService,
  FormValidationService,
];

export const appConfig: ApplicationConfig = {
  providers: [
    layoutConfig,
    authConfig,
    taskConfig,
    provideRouter(routes),
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      MessagesModule
    ),
    importProvidersFrom(
      NgxsModule.forRoot(
        [
          MenuStatusState,
          UserState,
          TaskState,
        ],
        {
          developmentMode: !environment.production,
        }
      ),
      NgxsReduxDevtoolsPluginModule.forRoot({
        disabled: environment.production,
      }),
      NgxsLoggerPluginModule.forRoot({ disabled: environment.production }),
      NgxsStoragePluginModule.forRoot({
        key: ['userState'],
      })
    ),
    SERVICES,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
  ],
};
import { Provider } from '@angular/core';
import {
  UserRepository,
} from '../domain/repositories';
import {
  UserImplRepository,
} from '../data/repositories';

export const authConfig: Provider[] = [
  {
    provide: UserRepository,
    useClass: UserImplRepository,
  },
];
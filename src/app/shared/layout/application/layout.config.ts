import { Provider } from '@angular/core';

import { MenuRepository } from '../domain/repositories';
import { MenuImplRepository } from '../data/repositories';

export const layoutConfig: Provider[] = [
  {
    provide: MenuRepository,
    useClass: MenuImplRepository,
  },
];
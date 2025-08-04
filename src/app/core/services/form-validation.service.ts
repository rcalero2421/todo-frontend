import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  validateInput(form: FormGroup, name: string) {
    return form.get(name)?.touched && form.get(name)?.errors?.['required'];
  }

  validateEmail(form: FormGroup) {
    return form.get('email')?.touched && form.get('email')?.errors?.['pattern'];
  }

  validateMinLength(form: FormGroup, name: string) {
    return form.get(name)?.touched && form.get(name)?.errors?.['minlength'];
  }

  validateMaxLength(form: FormGroup, name: string) {
    return form.get(name)?.touched && form.get(name)?.errors?.['maxlength'];
  }

  getErrorMessage(form: FormGroup, name: string) {
    if (form.get(name)?.hasError('required')) {
      return 'Campo requerido';
    }
    if (form.get(name)?.hasError('email')) {
      return 'Correo inválido';
    }
    if (form.get(name)?.hasError('pattern')) {
      return 'Solo se permiten números';
    }
    return '';
  }

  getErrorMessageEmail(form: FormGroup) {
    return form.get('email')?.hasError('pattern') ? 'Correo inválido' : '';
  }

  getErrorMessageMinLength(form: FormGroup, name: string) {
    return form.get(name)?.hasError('minlength')
      ? 'Mínimo de caracteres no alcanzado'
      : '';
  }

  getErrorMessageMaxLength(form: FormGroup, name: string) {
    return form.get(name)?.hasError('maxlength')
      ? 'Máximo de caracteres alcanzado'
      : '';
  }
}
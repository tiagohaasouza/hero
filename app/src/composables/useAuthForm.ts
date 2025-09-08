import { reactive } from 'vue';
import type {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  VerifyCodeRequest,
} from '../../../shared';
import {
  isValidEmail,
  isValidPassword,
  isValidCode,
} from '../../../shared';

export type AuthFormType =
  | 'login'
  | 'register'
  | 'forgotPassword'
  | 'verifyCode';

export function useAuthForm(type: AuthFormType) {
  const form = reactive<
    LoginRequest | RegisterRequest | ForgotPasswordRequest | VerifyCodeRequest
  >(initialForm(type));

  const errors = reactive<Record<string, string>>({});

  function initialForm(t: AuthFormType) {
    switch (t) {
      case 'login':
        return { email: '', password: '' } as LoginRequest;
      case 'register':
        return {
          email: '',
          password: '',
          confirmPassword: '',
        } as RegisterRequest;
      case 'forgotPassword':
        return { email: '' } as ForgotPasswordRequest;
      case 'verifyCode':
        return { code: '' } as VerifyCodeRequest;
    }
  }

  function validate(): boolean {
    Object.keys(errors).forEach((k) => delete errors[k]);
    let valid = true;

    if ('email' in form && !isValidEmail((form as any).email)) {
      errors.email = 'Invalid email';
      valid = false;
    }

    if ('password' in form && !isValidPassword((form as any).password)) {
      errors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    if (
      'confirmPassword' in form &&
      (form as any).confirmPassword !== (form as any).password
    ) {
      errors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    if ('code' in form && !isValidCode((form as any).code)) {
      errors.code = 'Code must be 6 digits';
      valid = false;
    }

    return valid;
  }

  return {
    form,
    errors,
    validate,
  };
}

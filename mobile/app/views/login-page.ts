import { EventData, Observable } from '@nativescript/core';
import { Page, Frame } from '@nativescript/core';
import { login } from '../services/auth-service';


class LoginViewModel extends Observable {
  email = '';
  password = '';
  isLoading = false;
  error = '';

  constructor(private page: Page) {
    super();
  }

  async onLogin() {
    this.set('error', '');
    if (!this.email || !this.password) {
      this.set('error', 'Champs obligatoires');
      return;
    }

    this.set('isLoading', true);
    try {
      await login(this.email, this.password);
      Frame.topmost().navigate('views/profile-page');
    } catch (e: any) {
      this.set('error', e.message || 'Erreur de connexion');
    } finally {
      this.set('isLoading', false);
    }
  }

  goToRegister() {
    Frame.topmost().navigate('views/register-page');
  }
}

export function onNavigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new LoginViewModel(page);
}

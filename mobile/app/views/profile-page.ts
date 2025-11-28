import { EventData, Observable } from '@nativescript/core';
import { Page, Frame } from '@nativescript/core';
import { getProfile, logout } from '../services/auth-service';

class ProfileViewModel extends Observable {
  full_name = '';
  email = '';
  isLoading = false;
  error = '';

  constructor(private page: Page) {
    super();
    this.loadProfile();
  }

  async loadProfile() {
    this.set('isLoading', true);
    this.set('error', '');
    try {
      const profile = await getProfile();
      this.set('full_name', profile.full_name);
      this.set('email', profile.email);
    } catch (e: any) {
      this.set('error', e.message || 'Erreur profil');
    } finally {
      this.set('isLoading', false);
    }
  }

  onLogout() {
    logout();
    Frame.topmost().navigate('views/login-page');
  }
}

export function onNavigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new ProfileViewModel(page);
}

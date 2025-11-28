import { EventData, Observable } from '@nativescript/core';
import { Page, Frame } from '@nativescript/core';
import { register } from '../services/auth-service';

class RegisterViewModel extends Observable {
  fullName = '';
  email = '';
  password = '';
  isLoading = false;
  error = '';

  constructor(page) {
    super();
  }

  async onRegister() {
    this.set("error", "");

    // Validation
    if (!this.fullName || !this.email || !this.password) {
      this.set("error", "Tous les champs sont requis");
      return;
    }

    if (this.password.length < 8) {
      this.set("error", "Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    this.set("isLoading", true);

    try {
      await register(this.email, this.password, this.fullName);
      Frame.topmost().navigate("views/login-page");
    } catch (e) {
      this.set("error", e.message || "Erreur lors de l'inscription");
    } finally {
      this.set("isLoading", false);
    }
  }

  goToLogin() {
    Frame.topmost().navigate("views/login-page");
  }
}

export function onNavigatingTo(args) {
  const page = args.object;
  page.bindingContext = new RegisterViewModel(page);
}

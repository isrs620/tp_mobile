import { ApplicationSettings } from '@nativescript/core';

const TOKEN_KEY = 'auth_token';

export function setToken(token: string) {
  ApplicationSettings.setString(TOKEN_KEY, token);
}

export function getToken(): string | null {
  return ApplicationSettings.hasKey(TOKEN_KEY)
    ? ApplicationSettings.getString(TOKEN_KEY)
    : null;
}

export function clearToken() {
  ApplicationSettings.remove(TOKEN_KEY);
}

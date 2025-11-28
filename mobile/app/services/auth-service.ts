import { API_BASE_URL } from '../config/api-config';
// const API_BASE_URL = 'http://10.0.2.2:3000'; // émulateur Android
import { getToken, setToken, clearToken } from '../utils/store';

export async function register(email: string, password: string, fullName: string) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, full_name: fullName })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Erreur inscription');
  }
  return data;
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Erreur connexion');
  }

  setToken(data.token);
  return data;
}

export async function getProfile() {
  const token = getToken();
  if (!token) {
    throw new Error('Non authentifié');
  }

  const res = await fetch(`${API_BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Erreur profil');
  }
  return data;
}

export function logout() {
  clearToken();
}

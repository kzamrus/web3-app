const STORAGE_KEY = 'accessCode';

export function setAccessCode(code: string): void {
  localStorage.setItem(STORAGE_KEY, code);
}

export function getAccessCode(): string | undefined {
  return localStorage.getItem(STORAGE_KEY) || undefined;
}

export function removeAccessCode(): void {
  localStorage.removeItem(STORAGE_KEY);
}

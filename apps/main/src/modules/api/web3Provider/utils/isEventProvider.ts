export interface EventProvider {
  on(type: string, callback: (data: any) => void): void;
  removeAllListeners: (type: string) => void;
}

export function isEventProvider(provider: any): provider is EventProvider {
  if (!provider?.on || !provider?.removeAllListeners) {
    return false;
  }

  return true;
}

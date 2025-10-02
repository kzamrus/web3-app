import { WriteProvider, getWriteProvider } from 'modules/api';
import { useEffect, useState } from 'react';

export function useProvider() {
  const [provider, setProvider] = useState<WriteProvider | null>(null);

  useEffect(() => {
    async function getProvider() {
      const provider = await getWriteProvider();

      setProvider(provider);
    }

    getProvider();
  }, [getWriteProvider]);

  return provider;
}

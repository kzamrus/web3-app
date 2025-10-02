import { useCallback, useState } from 'react';

interface IUseModal {
  isOpened: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export function useModal(defaultState = false): IUseModal {
  const [isOpened, setIsOpened] = useState(defaultState);

  const onOpen = useCallback(() => setIsOpened(true), []);
  const onClose = useCallback(() => setIsOpened(false), []);

  return {
    isOpened,
    onOpen,
    onClose,
  };
}

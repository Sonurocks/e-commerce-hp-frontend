"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

interface ModalOpenContextValue {
  isAnyModalOpen: boolean;
  registerModalOpen: () => void;
  registerModalClose: () => void;
}

const ModalOpenContext = createContext<ModalOpenContextValue | undefined>(
  undefined,
);

export const ModalOpenProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [openCount, setOpenCount] = useState(0);

  const registerModalOpen = useCallback(() => {
    setOpenCount((c) => c + 1);
  }, []);

  const registerModalClose = useCallback(() => {
    setOpenCount((c) => Math.max(0, c - 1));
  }, []);

  const value: ModalOpenContextValue = {
    isAnyModalOpen: openCount > 0,
    registerModalOpen,
    registerModalClose,
  };

  return (
    <ModalOpenContext.Provider value={value}>
      {children}
    </ModalOpenContext.Provider>
  );
};

export const useModalOpen = (): ModalOpenContextValue => {
  const context = useContext(ModalOpenContext);
  if (context === undefined) {
    return {
      isAnyModalOpen: false,
      registerModalOpen: () => {},
      registerModalClose: () => {},
    };
  }
  return context;
};

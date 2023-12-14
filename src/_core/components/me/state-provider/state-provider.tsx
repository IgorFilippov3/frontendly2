'use client';

import { createContext, useContext, useState } from "react";
import { SnackbarMessage } from "../snackbar/models/snackbar-message.model";

export interface MeStateContextType {
  message: SnackbarMessage | undefined;
  successMessage: (text: string) => void;
  errorMessage: (text: string) => void;
}

const MeStateContext = createContext<MeStateContextType | null>(null);

export const MeStateProvider = ({ children }: React.PropsWithChildren) => {
  const [message, setMessage] = useState<SnackbarMessage>();

  const successMessage = (text: string) => {
    setMessage({ severity: 'success', text });
  }

  const errorMessage = (text: string) => {
    setMessage({ severity: 'error', text });
  }

  return (
    <MeStateContext.Provider value={{
      message,
      successMessage,
      errorMessage
    }}>
      {children}
    </MeStateContext.Provider>
  );
}

export const useMeState = () => useContext(MeStateContext);
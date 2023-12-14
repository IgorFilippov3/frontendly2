'use client';

import { Alert, Snackbar, Stack, StyledEngineProvider } from "@mui/material";
import { useMeState } from "../state-provider/state-provider"
import { SnackbarMessage } from "./models/snackbar-message.model";
import { useEffect, useState } from "react";

export const MeSnackbar = () => {
  const [open, setOpen] = useState(false);
  const meState = useMeState();

  useEffect(() => {
    setOpen(true);
  }, [meState?.message])

  const handleClose = () => {
    setOpen(false);
  }

  if (!meState?.message) return <span></span>;

  const { text, severity }: SnackbarMessage = meState.message;

  return (
    <StyledEngineProvider injectFirst>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert 
            severity={severity} 
            sx={{ width: '100%' }} 
            variant="filled" 
            elevation={6}>
            {text}
          </Alert>
        </Snackbar>
      </Stack>
    </StyledEngineProvider>
  );
}
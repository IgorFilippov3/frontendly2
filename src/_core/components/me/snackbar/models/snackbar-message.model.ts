export interface SnackbarMessage {
  severity: 'error' | 'warning' | 'info' | 'success';
  text: string;
}
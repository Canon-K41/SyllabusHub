import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface SnackbarComponentProps {
  open: boolean;
  message: string;
  onClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
}

const SnackbarComponent: React.FC<SnackbarComponentProps> = ({ open, message, onClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;

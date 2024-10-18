import React, { useState } from 'react';
import { Button, CircularProgress, Snackbar, Box } from '@mui/material';
import { ClassData } from '@/types/type';
import { updateClassData } from '@/utils/data-processing/updateClassData';
import { saveClassData } from '@/utils/indexedDB';

interface UpdateButtonProps {
  setClassData: (classData: ClassData[]) => void;
}

const UpdateButton: React.FC<UpdateButtonProps> = ({ setClassData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const updatedClassData = await updateClassData();
      updatedClassData.forEach((classData) => {
        saveClassData(classData);
      });
      setClassData(updatedClassData);
      setSnackbarMessage('データの更新が完了しました。');
    } catch (error) {
      console.error('Update failed:', error);
      setSnackbarMessage('データの更新に失敗しました。');
    } finally {
      setIsLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Button
        variant="contained"
        onClick={handleUpdate}
        disabled={isLoading}
        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
      >
        {isLoading ? '更新中...' : 'データを更新'}
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
}
export default UpdateButton;

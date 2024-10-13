import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import SnackbarComponent from './SnackbarComponent';
import DialogComponent from './DialogComponent';
import { useRegistrationForm } from '@/hooks/useRegistrationForm';
import { callUserInfo } from '@/utils/callApi/callUserInfo';
import { saveUserInfo as saveUserInfoTODB } from '@/utils/indexedDB';

export default function RegistrationForm() {
  const { formData, handleChange, handleSelectChange } = useRegistrationForm();
  const [state, setState] = useState({
    error: '',
    openSnackbar: false,
    openDialog: false,
    userInfo: { userName: '', studentId: '' },
    loading: false,
    successSnackbar: false,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState((prevState) => ({ ...prevState, error: '', loading: true }));
    try {
      const data = await callUserInfo(formData.moodleAccount, formData.password);
      setState((prevState) => ({
        ...prevState,
        userInfo: data.userInfo,
        openDialog: true,
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: error instanceof Error ? error.message : 'エラーが発生しました。もう一度お試しください。',
        openSnackbar: true,
      }));
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setState((prevState) => ({ ...prevState, openSnackbar: false, successSnackbar: false }));
  };

  const handleCloseDialog = () => {
    setState((prevState) => ({ ...prevState, openDialog: false }));
  };

  const saveUserInfo = async () => {
    await saveUserInfoTODB({
      userName: state.userInfo.userName,
      studentId: state.userInfo.studentId,
      moodleAccount: formData.moodleAccount,
      password: formData.password,
      nickname: formData.nickname,
      grade: formData.grade,
      faculty: formData.faculty,
      course: formData.course,
    });
    setState((prevState) => ({ ...prevState, successSnackbar: true, openDialog: false }));
    window.location.href = '/';
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          ユーザー登録
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="moodleAccount"
            label="Moodleアカウント"
            name="moodleAccount"
            autoComplete="username"
            autoFocus
            value={formData.moodleAccount}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="nickname"
            label="ニックネーム"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="grade-label">学年</InputLabel>
            <Select
              labelId="grade-label"
              id="grade"
              name="grade"
              value={formData.grade}
              label="学年"
              onChange={handleSelectChange}
            >
              <MenuItem value={1}>1年</MenuItem>
              <MenuItem value={2}>2年</MenuItem>
              <MenuItem value={3}>3年</MenuItem>
              <MenuItem value={4}>4年</MenuItem>
              <MenuItem value={5}>大学院1年</MenuItem>
              <MenuItem value={6}>大学院2年</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            id="faculty"
            label="学部"
            name="faculty"
            value={formData.faculty}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="course"
            label="コース"
            name="course"
            value={formData.course}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={state.loading} // ローディング中はボタンを無効化
          >
            {state.loading ? <CircularProgress size={24} /> : '登録'}
          </Button>
        </Box>
      </Paper>
      <SnackbarComponent open={state.openSnackbar} message={state.error} onClose={handleCloseSnackbar} />
      <Snackbar
        open={state.successSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="登録が成功しました！"
      />
      <DialogComponent
        open={state.openDialog}
        userInfo={state.userInfo}
        onClose={handleCloseDialog}
        onConfirm={saveUserInfo}
      />
    </Container>
  );
}

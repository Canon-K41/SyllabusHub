import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

interface DialogComponentProps {
  open: boolean;
  userInfo: { userName: string; studentId: string };
  onClose: () => void;
  onConfirm: () => void;
}

const DialogComponent: React.FC<DialogComponentProps> = ({ open, userInfo, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"ユーザー情報の確認"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          あなたは {userInfo.userName}、学籍番号 {userInfo.studentId} です。
          この情報で登録を進めてよろしいですか？
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button onClick={onConfirm} autoFocus>
          確認
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;

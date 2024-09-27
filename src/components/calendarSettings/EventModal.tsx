import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const EventModal = ({ modalIsOpen, closeModal, newEvent, handleInputChange, handleSubmit, deleteEvent }) => {
  return (
    <Modal
      open={modalIsOpen}
      onClose={closeModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Typography id="modal-title" variant="h6" component="h2">
          イベントを追加/更新
        </Typography>
        <form>
          <TextField
            label="タイトル"
            name="title"
            value={newEvent.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="開始日時"
            name="start"
            value={newEvent.start}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="終了日時"
            name="end"
            value={newEvent.end}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="場所"
            name="place"
            value={newEvent.place}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="URL"
            name="url"
            value={newEvent.url}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              保存
            </Button>
            <Button variant="outlined" onClick={deleteEvent}>
              削除
            </Button>
            <Button variant="outlined" onClick={closeModal}>
              キャンセル
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EventModal;

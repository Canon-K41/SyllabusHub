import React from 'react';
import { Modal, Box, Typography, TextField, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { EventInput } from '@fullcalendar/core';

interface EventModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  newEvent: EventInput;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  deleteEvent: () => void;
}

const EventModal = ({ modalIsOpen, closeModal, newEvent, handleInputChange, handleSubmit, deleteEvent }: EventModalProps) => {
  return (
    <Modal
      open={modalIsOpen}
      onClose={closeModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-96 bg-white shadow-lg p-4 max-h-screen overflow-y-auto">
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
          <TextField
            label="説明"
            name="description"
            value={newEvent.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Accordion>
            <AccordionSummary
              aria-controls="additional-settings-content"
              id="additional-settings-header"
            >
              <Typography>追加設定</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                label="繰り返し"
                name="freq"
                value={newEvent.rrule.freq}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="繰り返し回数"
                name="count"
                value={newEvent.rrule.count}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="繰り返し間隔"
                name="interval"
                value={newEvent.rrule.interval}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="曜日"
                name="byweekday"
                value={newEvent.rrule.byweekday}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="開始日"
                name="dtstart"
                value={newEvent.rrule.dtstart}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="終了日"
                name="until"
                value={newEvent.rrule.until}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="除外日"
                name="exdate"
                value={newEvent.exdate}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </AccordionDetails>
          </Accordion>
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

import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  ThemeProvider,
  createTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

type Event = {
  id: number;
  day: number;
  time: string;
  title: string;
  category: 'work' | 'personal' | 'study' | 'other';
};

const initialEvents: Event[] = [
  { id: 1, day: 1, time: '09:00', title: '週次ミーティング', category: 'work' },
  { id: 2, day: 3, time: '18:30', title: 'ヨガクラス', category: 'personal' },
  { id: 3, day: 5, time: '15:00', title: '英語レッスン', category: 'study' },
];

const daysOfWeek = ['月', '火', '水', '木', '金', '土', '日'];

export default function Component() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [open, setOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  const handleOpen = (day: number) => {
    setCurrentEvent({ id: Date.now(), day, time: '', title: '', category: 'other' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentEvent(null);
  };

  const handleSave = () => {
    if (currentEvent) {
      setEvents([...events, currentEvent]);
    }
    handleClose();
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'work': return '#3f51b5';
      case 'personal': return '#f50057';
      case 'study': return '#4caf50';
      default: return '#ff9800';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={3} sx={{ maxWidth: 1200, margin: 'auto', mt: 4, p: 3 }}>
        <Typography variant="h4" gutterBottom component="div" align="center" color="primary">
          週間カレンダー
        </Typography>
        <Grid container spacing={2}>
          {daysOfWeek.map((day, index) => (
            <Grid item xs key={day}>
              <Paper elevation={2} sx={{ p: 2, height: '100%', minHeight: 300 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">{day}</Typography>
                  <Button
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpen(index)}
                  >
                    追加
                  </Button>
                </Box>
                {events
                  .filter(event => event.day === index)
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map(event => (
                    <Paper
                      key={event.id}
                      elevation={1}
                      sx={{
                        p: 1,
                        mb: 1,
                        backgroundColor: getCategoryColor(event.category),
                        color: 'white',
                      }}
                    >
                      <Typography variant="body2">{event.time}</Typography>
                      <Typography variant="body1">{event.title}</Typography>
                    </Paper>
                  ))}
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>新規予定追加</DialogTitle>
          <DialogContent>
            <TextField
              margin="normal"
              label="時間"
              type="time"
              fullWidth
              value={currentEvent?.time || ''}
              onChange={(e) => setCurrentEvent(prev => prev ? { ...prev, time: e.target.value } : null)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="normal"
              label="タイトル"
              fullWidth
              value={currentEvent?.title || ''}
              onChange={(e) => setCurrentEvent(prev => prev ? { ...prev, title: e.target.value } : null)}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>カテゴリー</InputLabel>
              <Select
                value={currentEvent?.category || ''}
                onChange={(e) => setCurrentEvent(prev => prev ? { ...prev, category: e.target.value as 'work' | 'personal' | 'study' | 'other' } : null)}
              >
                <MenuItem value="work">仕事</MenuItem>
                <MenuItem value="personal">個人</MenuItem>
                <MenuItem value="study">勉強</MenuItem>
                <MenuItem value="other">その他</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>キャンセル</Button>
            <Button onClick={handleSave} color="primary">
              保存
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </ThemeProvider>
  );
}

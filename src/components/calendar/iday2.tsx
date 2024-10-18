import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

type WeeklyEvent = {
  id: number;
  day: string;
  time: string;
  event: string;
  category: 'work' | 'personal' | 'study' | 'other';
};

const initialEvents: WeeklyEvent[] = [
  { id: 1, day: '月', time: '09:00', event: '週次ミーティング', category: 'work' },
  { id: 2, day: '水', time: '18:30', event: 'ヨガクラス', category: 'personal' },
  { id: 3, day: '金', time: '15:00', event: '英語レッスン', category: 'study' },
];

export default function Component() {
  const [events, setEvents] = useState<WeeklyEvent[]>(initialEvents);
  const [open, setOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<WeeklyEvent | null>(null);

  const days = ['月', '火', '水', '木', '金', '土', '日'];

  const handleOpen = (event: WeeklyEvent | null) => {
    setCurrentEvent(event || { id: Date.now(), day: '', time: '', event: '', category: 'other' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentEvent(null);
  };

  const handleSave = () => {
    if (currentEvent) {
      if (currentEvent.id) {
        setEvents(events.map(e => e.id === currentEvent.id ? currentEvent : e));
      } else {
        setEvents([...events, { ...currentEvent, id: Date.now() }]);
      }
    }
    handleClose();
  };

  const handleDelete = (id: number) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'work': return 'primary';
      case 'personal': return 'secondary';
      case 'study': return 'info';
      default: return 'default';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={3} sx={{ maxWidth: 800, margin: 'auto', mt: 4, p: 3 }}>
        <Typography variant="h4" gutterBottom component="div" align="center" color="primary">
          週間繰り返し予定
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleOpen(null)}
          >
            新規予定追加
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="週間繰り返し予定表">
            <TableHead>
              <TableRow>
                <TableCell>曜日</TableCell>
                <TableCell>時間</TableCell>
                <TableCell>予定</TableCell>
                <TableCell>カテゴリー</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {days.map(day => (
                <TableRow key={day}>
                  <TableCell component="th" scope="row">
                    {day}
                  </TableCell>
                  <TableCell colSpan={4}>
                    {events
                      .filter(event => event.day === day)
                      .sort((a, b) => a.time.localeCompare(b.time))
                      .map(event => (
                        <Box key={event.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography variant="body2" sx={{ minWidth: 60 }}>{event.time}</Typography>
                          <Typography variant="body1" sx={{ flexGrow: 1 }}>{event.event}</Typography>
                          <Chip
                            label={event.category}
                            size="small"
                            color={getCategoryColor(event.category)}
                            sx={{ mr: 1 }}
                          />
                          <IconButton size="small" onClick={() => handleOpen(event)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" onClick={() => handleDelete(event.id)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{currentEvent?.id ? '予定を編集' : '新規予定追加'}</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="normal">
              <InputLabel>曜日</InputLabel>
              <Select
                value={currentEvent?.day || ''}
                onChange={(e) => setCurrentEvent(prev => prev ? { ...prev, day: e.target.value as string } : null)}
              >
                {days.map(day => (
                  <MenuItem key={day} value={day}>{day}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
              label="予定"
              fullWidth
              value={currentEvent?.event || ''}
              onChange={(e) => setCurrentEvent(prev => prev ? { ...prev, event: e.target.value } : null)}
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

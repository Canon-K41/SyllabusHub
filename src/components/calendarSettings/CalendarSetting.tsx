import React from 'react';
import { TextField, Box, Select, MenuItem } from '@mui/material';

interface TimeSettingsProps {
  slotMinTime: string;
  setMinTime: (value: string) => void;
  slotMaxTime: string;
  setMaxTime: (value: string) => void;
  slotLabelInterval: string;
  setSlotLabelInterval: (value: string) => void;
  slotDuration: string;
  setSlotDuration: (value: string) => void;
  defaultView: string;
  setDefaultView: (value: string) => void;
}

const CalendarSettings = ({ slotMinTime, setMinTime, slotMaxTime, setMaxTime, slotLabelInterval, setSlotLabelInterval, slotDuration, setSlotDuration, defaultView, setDefaultView }: TimeSettingsProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'right', mb: 2 }}>
      <Select 
        label="表示形式"
        value={defaultView}
        onChange={(e) => setDefaultView(e.target.value)}
        sx={{ width: 150, marginX: 2 }}
      >
        <MenuItem value="timeGridDay">日次</MenuItem>
        <MenuItem value="timeGridWeek">週間</MenuItem>
        <MenuItem value="dayGridMonth">月次</MenuItem>
      </Select>
      <TextField
        label="開始時間"
        type="time"
        value={slotMinTime}
        onChange={(e) => setMinTime(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 600, // 5分刻み
        }}
        sx={{ width: 150, marginX: 2 }}
      />
      <TextField
        label="終了時間"
        type="time"
        value={slotMaxTime}
        onChange={(e) => setMaxTime(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5分刻み
        }}
        sx={{ width: 150, marginX: 2 }}
      />
      <TextField
        label="ラベル間隔"
        type="time"
        value={slotLabelInterval}
        onChange={(e) => setSlotLabelInterval(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 600, // 5分刻み
        }}
        sx={{ width: 150, marginX: 2 }}
      />
      <TextField
        label="表示間隔"
        type="time"
        value={slotDuration}
        onChange={(e) => setSlotDuration(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 600, // 5分刻み
        }}
        sx={{ width: 150, marginX: 2 }}
      />
    </Box>
  );
};

export default CalendarSettings;


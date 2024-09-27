import React from 'react';
import { TextField, Box } from '@mui/material';

const TimeSettings = ({ slotMinTime, setMinTime, slotMaxTime, setMaxTime, slotLabelInterval, setSlotLabelInterval, slotDuration, setSlotDuration }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'right', mb: 2 }}>
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

export default TimeSettings;


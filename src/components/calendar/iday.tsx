import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  Paper, 
  Typography, 
  Chip,
  ThemeProvider,
  createTheme,
  Box,
} from '@mui/material';
import { 
  AccessTime as AccessTimeIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  FitnessCenter as FitnessCenterIcon,
  Restaurant as RestaurantIcon,
  Commute as CommuteIcon,
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

type ScheduleItem = {
  time: string;
  activity: string;
  type: 'school' | 'work' | 'exercise' | 'meal' | 'commute';
  details?: string;
};

const scheduleData: ScheduleItem[] = [
  { time: '07:00', activity: '起床', type: 'commute' },
  { time: '07:30', activity: '朝食', type: 'meal', details: '卵とトースト' },
  { time: '08:30', activity: '通学', type: 'commute' },
  { time: '09:00', activity: '講義: プログラミング基礎', type: 'school', details: '教室: 101' },
  { time: '11:00', activity: '講義: データ構造とアルゴリズム', type: 'school', details: '教室: 203' },
  { time: '13:00', activity: '昼食', type: 'meal', details: '学食' },
  { time: '14:00', activity: 'アルバイト', type: 'work', details: 'カフェ' },
  { time: '18:00', activity: 'ジム', type: 'exercise', details: 'ランニングと筋トレ' },
  { time: '19:30', activity: '夕食', type: 'meal', details: '自炊' },
  { time: '20:30', activity: '自習', type: 'school', details: 'プログラミング課題' },
  { time: '23:00', activity: '就寝', type: 'commute' },
];

const getIcon = (type: ScheduleItem['type']) => {
  switch (type) {
    case 'school':
      return <SchoolIcon />;
    case 'work':
      return <WorkIcon />;
    case 'exercise':
      return <FitnessCenterIcon />;
    case 'meal':
      return <RestaurantIcon />;
    case 'commute':
      return <CommuteIcon />;
    default:
      return <AccessTimeIcon />;
  }
};

export default function Component() {
  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={3} sx={{ maxWidth: 600, margin: 'auto', mt: 4, p: 3 }}>
        <Typography variant="h4" gutterBottom component="div" align="center" color="primary">
          今日の予定
        </Typography>
        <List>
          {scheduleData.map((item, index) => (
            <ListItem key={index} alignItems="flex-start" divider={index !== scheduleData.length - 1}>
              <ListItemIcon>
                {getIcon(item.type)}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" color="text.primary">
                      {item.activity}
                    </Typography>
                    <Chip
                      label={item.time}
                      size="small"
                      icon={<AccessTimeIcon />}
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                }
                secondary={
                  item.details && (
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      {item.details}
                    </Typography>
                  )
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </ThemeProvider>
  );
}

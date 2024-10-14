import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Chip
} from '@mui/material';
import { Assignment, Class, Schedule } from '@mui/icons-material';

interface HomeworkItem {
  href: string;
  classInfo: string;
  homeworkTitle: string;
  deadline: string;
}

interface HomeworkListProps {
  homework?: (HomeworkItem | null)[];
}

export default function HomeworkList({ homework = [] }: HomeworkListProps) {
  if (!homework || homework.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">No homework assignments available.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Homework List
      </Typography>
      <Grid container spacing={3}>
        {homework.map((item, index) => 
          item && (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <Assignment sx={{ mr: 1, verticalAlign: 'middle' }} />
                    {item.homeworkTitle}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <Class sx={{ mr: 1, verticalAlign: 'middle' }} />
                    {item.classInfo}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Schedule sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Deadline: {item.deadline}
                  </Typography>
                  <Box mt={2}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      <Chip label="View Assignment" color="primary" clickable />
                    </a>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
}

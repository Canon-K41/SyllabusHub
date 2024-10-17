import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { OpenInNew as OpenInNewIcon } from '@mui/icons-material';

interface ClassInfo {
  year: string;
  term: string;
  weekOfDateParts: string[];
  cleanTitle: string;
  instructor: string;
  url: string;
}

export default function NextClass({ classInfo }: { classInfo: ClassInfo }) {
  return (
    <>
    <Typography variant="h4" gutterBottom>
      Next Event
    </Typography>
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {classInfo.cleanTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {classInfo.year}年度 {classInfo.term}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {classInfo.weekOfDateParts.join(' / ')}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          担当教員: {classInfo.instructor}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            endIcon={<OpenInNewIcon />}
            href={classInfo.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${classInfo.cleanTitle}のMoodleページを開く`}
            fullWidth
          >
            Moodleページを開く
          </Button>
        </Box>
      </CardContent>
    </Card>
    </>
  );
}

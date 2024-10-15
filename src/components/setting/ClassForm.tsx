'use client';

import React, { useState } from 'react';
import { TextField, Button, Box, Container, Typography,  MenuItem, FormGroup, FormControlLabel, Checkbox, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { saveClassData } from '@/utils/indexedDB';
import { ClassData } from '@/types/type';

const ClassForm = () => {
  const [formData, setFormData] = useState<ClassData>({
    class_id: '',
    title: '',
    instructor: '',
    university: '',
    description: '',
    url: '',
    duration: '01:30',
    exdata: [], 
    rrule: {
      freq: 'WEEKLY',
      interval: 1,
      count: 0,
      byweekday: [],
      dtstart: '',
    },
  });

  const [currentExdate, setCurrentExdate] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'rrule.byweekday') {
      const byweekday = value.split(',');
      setFormData((prevData) => ({
        ...prevData,
        rrule: {
          ...prevData.rrule,
          byweekday: byweekday,
        },
      }));
    } else if (name.startsWith('rrule.')) {
      const rruleKey = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        rrule: {
          ...prevData.rrule,
          [rruleKey]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setFormData((prevData) => {
      const newByweekday = checked
        ? [...prevData.rrule.byweekday, value]
        : prevData.rrule.byweekday.filter((day) => day !== value);
      return {
        ...prevData,
        rrule: {
          ...prevData.rrule,
          byweekday: newByweekday,
        },
      };
    });
  };

  const handleExdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentExdate(e.target.value);
  };

  const addExdate = () => {
    if (currentExdate) {
      setFormData((prevData) => ({
        ...prevData,
        exdata: [...prevData.exdata, currentExdate],
      }));
      setCurrentExdate('');
    }
  };

  const removeExdate = (date: string) => {
    setFormData((prevData) => ({
      ...prevData,
      exdata: prevData.exdata.filter((d) => d !== date),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formData.class_id = formData.rrule.dtstart + formData.instructor
    try {
      await saveClassData(formData);
      alert('Class saved successfully!');
    } catch (error) {
      console.error('Failed to save class:', error);
      alert('Failed to save class');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Class Form
        </Typography>
        <TextField
          required
          fullWidth
          margin="normal"
          label="授業名"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          required
          margin="normal"
          label="講師名"
          name="instructor"
          value={formData.instructor}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="大学名"
          name="university"
          value={formData.university}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="詳細"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="URL"
          name="url"
          value={formData.url}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          required
          margin="normal"
          label="開始日時"
          name="rrule.dtstart"
          type="datetime-local"
          value={formData.rrule.dtstart}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="授業時間"
          name="duration"
          type="time"
          value={formData.duration}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          select
          margin="normal"
          label="頻度単位"
          name="rrule.freq"
          value={formData.rrule.freq}
          onChange={handleChange}
        >
          <MenuItem value="DAILY">毎日</MenuItem>
          <MenuItem key="WEEKLY" value="WEEKLY">毎週</MenuItem>
          <MenuItem value="MONTHLY">毎月</MenuItem>
          <MenuItem value="YEARLY">毎年</MenuItem>
        </TextField> 
        <TextField
          fullWidth
          margin="normal"
          label="頻度"
          name="rrule.interval"
          type="number"
          value={formData.rrule.interval}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="授業回数"
          name="rrule.count"
          type="number"
          value={formData.rrule.count}
          onChange={handleChange}
        />
        <Typography variant="subtitle1" gutterBottom>
          曜日
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheckboxChange}
                value="SU"
                checked={formData.rrule.byweekday.includes('SU')}
              />
            }
            label="日"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheckboxChange}
                value="MO"
                checked={formData.rrule.byweekday.includes('MO')}
              />
            }
            label="月"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheckboxChange}
                value="TU"
                checked={formData.rrule.byweekday.includes('TU')}
              />
            }
            label="火"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheckboxChange}
                value="WE"
                checked={formData.rrule.byweekday.includes('WE')}
              />
            }
            label="水"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheckboxChange}
                value="TH"
                checked={formData.rrule.byweekday.includes('TH')}
              />
            }
            label="木"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheckboxChange}
                value="FR"
                checked={formData.rrule.byweekday.includes('FR')}
              />
            }
            label="金"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheckboxChange}
                value="SA"
                checked={formData.rrule.byweekday.includes('SA')}
              />
            }
            label="土"
          />
        </FormGroup>
        <Typography variant="subtitle1" gutterBottom>
          除外日
        </Typography>
        <Box display="flex" alignItems="center">
          <TextField
            margin="normal"
            label="除外日"
            type="date"
            value={currentExdate}
            onChange={handleExdateChange}
            InputLabelProps={{ shrink: true }}
          />
          <Button onClick={addExdate} variant="contained" color="primary" sx={{ ml: 2, mt: 2 }}>
            追加
          </Button>
        </Box>
        <List>
          {formData.exdata.map((date, index) => (
            <ListItem key={index} secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => removeExdate(date)}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemText primary={date} />
            </ListItem>
          ))}
        </List>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default ClassForm;

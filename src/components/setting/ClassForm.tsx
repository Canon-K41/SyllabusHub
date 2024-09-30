'use client';

import React, { useState } from 'react';
import { TextField, Button, Box, Container, Typography } from '@mui/material';
import { saveClass } from '@/utils/indexedDB';
import { classData } from '@/types/DetaType';
import DeleteButton  from '@/components/test/deleteButton';

const ClassForm = () => {
  const [formData, setFormData] = useState<classData>({
    class_id: '',
    title: '',
    instructor: '',
    university: '',
    description: '',
    url: '',
    duration: '',
    exdata: [], 
    rrule: {
      freq: '',
      interval: 0,
      count: 0,
      byweekday: [],
      dtstart: '',
    },
  });

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
    } else if (name.startsWith('rrule.') ) {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await saveClass(formData);
      alert('Class saved successfully!');
    } catch (error) {
      console.error('Failed to save class:', error);
      alert('Failed to save class');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit
        </Button>
        <DeleteButton />
        <Typography variant="h6" gutterBottom>
          Class Form
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Class ID"
          name="class_id"
          value={formData.class_id}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Instructor"
          name="instructor"
          value={formData.instructor}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="University"
          name="university"
          value={formData.university}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Description"
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
        margin="normal"
        label="RRule Dtstart"
        name="rrule.dtstart"
        type="datetime-local"
        value={formData.rrule.dtstart}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
      />
        <TextField
          fullWidth
          margin="normal"
          label="RRule Until"
          name="rrule.until"
          type="time"
          value={formData.duration}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="RRule Frequency"
          name="rrule.freq"
          value={formData.rrule.freq}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="RRule Interval"
          name="rrule.interval"
          type="number"
          value={formData.rrule.interval}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="RRule Count"
          name="rrule.count"
          type="number"
          value={formData.rrule.count}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="RRule By Weekday"
          name="rrule.byweekday"
          value={formData.rrule.byweekday}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="RRule Exdata"
          name="exdata"
          value={formData.exdata}
          onChange={handleChange}
        />
      </Box>
    </Container>
  );
};

export default ClassForm;

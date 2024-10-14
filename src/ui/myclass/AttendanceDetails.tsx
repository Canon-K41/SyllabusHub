import React from 'react';
import { LinearProgress, Typography, Chip } from '@mui/material';
import { Attendance } from '@/types/type';

const attendanceStatusColors = {
  absent: '#FF0000',
  present: '#32CD32',
  late: '#FFA500',
};

interface AttendanceDetailsProps {
  attendances: Attendance[];
  attendanceRate: number;
}

const AttendanceDetails: React.FC<AttendanceDetailsProps> = ({ attendances, attendanceRate }) => {
  const attendedClasses = attendances.filter(a => a.status === 'present').length;
  const totalClasses = attendances.length;

  return (
    <>
      <LinearProgress variant="determinate" value={(attendedClasses / totalClasses) * 100} />
      <Typography variant="body2">{`${attendedClasses}/${totalClasses} (${Math.round((attendedClasses / totalClasses) * 100)}%)`}</Typography>
      <Typography variant="body2" mt={2}>出席した授業：</Typography>
      {attendances.map((attendance, index) => (
        <Chip
          key={index}
          label={attendance.date}
          size="small"
          style={{
            margin: '2px',
            backgroundColor: attendanceStatusColors[attendance.status],
            color: 'white',
          }}
        />
      ))}
      <Typography variant="body2" mt={2}>今日までの出席率：{Math.round(attendanceRate)}%</Typography>
    </>
  );
};

export default AttendanceDetails;

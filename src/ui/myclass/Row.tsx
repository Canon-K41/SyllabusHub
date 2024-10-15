import React, { useState } from 'react';
import { IconButton, TableCell, TableRow, Collapse, Box, Typography, Chip, Table, TableBody, TableHead } from '@mui/material';
import { Edit as EditIcon, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import AttendanceDetails from '@/ui/myclass/AttendanceDetails';
import AssignmentDetails from '@/ui/myclass/AssignmentDetails';
import CourseEditor from './CourseEditor';
import { calculateAttendanceRate } from '@/utils/myclass/calculateAttendanceRate';
import { gradeColors, statusColors, statusLabels } from '@/types/constants';
import { ClassData } from '@/types/type';

function Row({ row, classData, setClassData }: { row: ClassData; classData: ClassData[], setClassData: React.Dispatch<React.SetStateAction<ClassData[]>> }) {
  const [open, setOpen] = useState(false);
  const [isEditorOpen, setEditorOpen] = useState(false);

  const handleOpen = () => {
    setEditorOpen(true);
  };

  const handleClose = () => {
    setEditorOpen(false);
  };

  const today = new Date().toISOString().split('T')[0];
  const attendanceRate = calculateAttendanceRate(row.attendances, today);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <Chip
            label={statusLabels[row.status]}
            style={{
              backgroundColor: statusColors[row.status],
              color: 'white',
            }}
          />
        </TableCell>
        <TableCell
          align="center"
          style={{
            backgroundColor: gradeColors[row.grade].bg,
            color: gradeColors[row.grade].text,
            fontWeight: 'bold',
          }}
        >
          {row.grade}
        </TableCell>
        <TableCell align="center">{row.credits}</TableCell>
        <TableCell align="center" component="th" scope="row">{row.courseName}</TableCell>
        <TableCell align="center">{row.year}</TableCell>
        <TableCell align="center">{row.term}</TableCell>
        <TableCell>
          <IconButton aria-label="edit" onClick={handleOpen}>
            <EditIcon />
          </IconButton>
          <CourseEditor course={row} isOpen={isEditorOpen} onClose={handleClose} classDataList={classData} setClassDataList={setClassData} />
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                詳細情報
              </Typography>
              <TableCell>
                {row.description}
              </TableCell>
              <Table size="small" aria-label="details">
                <TableHead>
                  <TableRow>
                    <TableCell>出席状況</TableCell>
                    <TableCell>課題提出状況</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <AttendanceDetails attendances={row.attendances} attendanceRate={attendanceRate} />
                    </TableCell>
                    <TableCell>
                      <AssignmentDetails assignments={row.assignments} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default Row;

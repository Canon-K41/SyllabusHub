import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip, Collapse, Box, Typography } from '@mui/material';
import { Edit as EditIcon, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import { calculateAttendanceRate } from '@/utils/myclass/calculateAttendanceRate';
import AttendanceDetails from './AttendanceDetails';
import AssignmentDetails from './AssignmentDetails';
import EditCourseDialog from './EditCourseDialog';
import { Course } from '@/types/type';
import { createTheme } from '@mui/material/styles';

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

const statusColors = {
  cancellation: '#FFA500',
  inProgress: '#4169E1',
  completed: '#32CD32',
  failed: '#FF0000',
};

const statusLabels = {
  Cancellation: 'キャンセル',
  inProgress: '進行中',
  completed: '完了',
  failed: '不合格',
};

function Row({ row, onEdit }: { row: Course; onEdit: (course: Course) => void }) {
  const [open, setOpen] = useState(false);

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
        <TableCell>
          <Chip
            label={statusLabels[row.status]}
            style={{
              backgroundColor: statusColors[row.status],
              color: 'white',
            }}
          />
        </TableCell>
        <TableCell>{row.grade}</TableCell>
        <TableCell>{row.credits}</TableCell>
        <TableCell>{row.courseName}</TableCell>
        <TableCell>{`${row.year} ${row.term}`}</TableCell>
        <TableCell>
          <IconButton onClick={() => onEdit(row)}>
            <EditIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                詳細情報
              </Typography>
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

export default function CourseTableMUIDetailed() {
  const [courses, setCourses] = useState<Course[]>([
    {
      courseName: "基幹教育セミナー",
      credits: "1",
      grade: "Ｒ",
      year: "2023",
      term: "夏学期",
      fieldCode: "KED-KES1111J",
      courseId: "23535305",
      instructor: "藤井　慎介",
      date: "2023/08/18",
      status: 'completed',
      attendances: [
        { date: '2023/04/10', status: 'present' },
        { date: '2023/04/17', status: 'present' },
        { date: '2023/04/24', status: 'absent' },
        { date: '2023/05/01', status: 'present' },
        { date: '2023/05/08', status: 'present' },
      ],
      assignments: [
        { name: 'レポート1', dueDate: '2023/04/30', submittedDate: '2023/04/28', score: 85, maxScore: 100 },
        { name: 'レポート2', dueDate: '2023/05/15', submittedDate: '2023/05/14', score: 92, maxScore: 100 },
        { name: '最終レポート', dueDate: '2023/06/30', submittedDate: null, score: null, maxScore: 100 },
      ],
    },
    {
      courseName: "課題協学科目",
      credits: "2.5",
      grade: "Ｓ",
      year: "2023",
      term: "後",
      fieldCode: "KED-ICL1131J",
      courseId: "23531702",
      instructor: "大橋　浩",
      date: "2024/02/20",
      status: 'inProgress',
      attendances: [
        { date: '2023/10/02', status: 'present' },
        { date: '2023/10/09', status: 'present' },
        { date: '2023/10/16', status: 'present' },
        { date: '2023/10/23', status: 'absent' },
        { date: '2023/10/30', status: 'present' },
      ],
      assignments: [
        { name: 'グループワーク1', dueDate: '2023/10/20', submittedDate: '2023/10/19', score: 88, maxScore: 100 },
        { name: 'グループワーク2', dueDate: '2023/11/10', submittedDate: '2023/11/09', score: 95, maxScore: 100 },
        { name: '最終プレゼンテーション', dueDate: '2023/12/15', submittedDate: null, score: null, maxScore: 100 },
      ],
    },
  ]);

  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleEdit = (course: Course) => {
    setEditingCourse({ ...course });
    setOpenDialog(true);
  };

  const handleSave = () => {
    if (editingCourse) {
      setCourses(
        courses.map((c) =>
          c.fieldCode === editingCourse.fieldCode ? editingCourse : c
        )
      );
      setOpenDialog(false);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleAttendanceChange = (index: number, field: string, value: string) => {
    if (editingCourse) {
      const updatedAttendances = [...editingCourse.attendances];
      updatedAttendances[index] = { ...updatedAttendances[index], [field]: value };
      setEditingCourse({ ...editingCourse, attendances: updatedAttendances });
    }
  };

  const handleAssignmentChange = (index: number, field: string, value: string) => {
    if (editingCourse) {
      const updatedAssignments = [...editingCourse.assignments];
      updatedAssignments[index] = { ...updatedAssignments[index], [field]: value };
      setEditingCourse({ ...editingCourse, assignments: updatedAssignments });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>状態</TableCell>
              <TableCell>成績</TableCell>
              <TableCell>単位</TableCell>
              <TableCell>授業名</TableCell>
              <TableCell>時期</TableCell>
              <TableCell>編集</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <Row key={course.fieldCode} row={course} onEdit={handleEdit} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <EditCourseDialog
        open={openDialog}
        onClose={handleClose}
        onSave={handleSave}
        course={editingCourse}
        onAttendanceChange={handleAttendanceChange}
        onAssignmentChange={handleAssignmentChange}
      />
    </ThemeProvider>
  );
}

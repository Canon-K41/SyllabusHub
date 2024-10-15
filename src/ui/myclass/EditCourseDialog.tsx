import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem, Typography, Box } from '@mui/material';
import { ClassData } from '@/types/type';

interface EditCourseDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  course: ClassData | null;
  onAttendanceChange: (index: number, field: string, value: string) => void;
  onAssignmentChange: (index: number, field: string, value: string) => void;
}

const EditCourseDialog: React.FC<EditCourseDialogProps> = ({ open, onClose, onSave, course, onAttendanceChange, onAssignmentChange }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>授業情報の編集</DialogTitle>
      <DialogContent>
        {course && (
          <div>
            <TextField
              margin="dense"
              label="授業名"
              fullWidth
              value={course.courseName}
              onChange={(e) =>
                onAttendanceChange(-1, 'courseName', e.target.value)
              }
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>状態</InputLabel>
              <Select
                value={course.status}
                onChange={(e) =>
                  onAttendanceChange(-1, 'status', e.target.value)
                }
              >
                <MenuItem value="notStarted">未開始</MenuItem>
                <MenuItem value="inProgress">進行中</MenuItem>
                <MenuItem value="completed">完了</MenuItem>
                <MenuItem value="failed">不合格</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="h6" gutterBottom mt={2}>
              出席情報
            </Typography>
            {course.attendances.map((attendance, index) => (
              <Box key={index} mb={2}>
                <TextField
                  margin="dense"
                  label="日付"
                  fullWidth
                  value={attendance.date}
                  onChange={(e) => onAttendanceChange(index, 'date', e.target.value)}
                />
                <FormControl fullWidth margin="dense">
                  <InputLabel>ステータス</InputLabel>
                  <Select
                    value={attendance.status}
                    onChange={(e) => onAttendanceChange(index, 'status', e.target.value)}
                  >
                    <MenuItem value="absent">欠席</MenuItem>
                    <MenuItem value="present">出席</MenuItem>
                    <MenuItem value="late">遅刻</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            ))}
            <Typography variant="h6" gutterBottom mt={2}>
              課題情報
            </Typography>
            {course.assignments.map((assignment, index) => (
              <Box key={index} mb={2}>
                <TextField
                  margin="dense"
                  label="課題名"
                  fullWidth
                  value={assignment.name}
                  onChange={(e) => onAssignmentChange(index, 'name', e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="提出期限"
                  fullWidth
                  value={assignment.dueDate}
                  onChange={(e) => onAssignmentChange(index, 'dueDate', e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="提出日"
                  fullWidth
                  value={assignment.submittedDate || ''}
                  onChange={(e) => onAssignmentChange(index, 'submittedDate', e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="得点"
                  fullWidth
                  value={assignment.score !== null ? assignment.score : ''}
                  onChange={(e) => onAssignmentChange(index, 'score', e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="満点"
                  fullWidth
                  value={assignment.maxScore}
                  onChange={(e) => onAssignmentChange(index, 'maxScore', e.target.value)}
                />
              </Box>
            ))}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button onClick={onSave} color="primary">
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCourseDialog;

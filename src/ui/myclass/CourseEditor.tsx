'use client';
import React, { useState } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  SelectChangeEvent,
  Dialog,
  DialogContent, 
  DialogActions, 
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Attendance, Assignment, ClassData } from '@/types/type';
import { saveClassData } from '@/utils/indexedDB';

interface CourseEditorProps {
  course: ClassData;
  isOpen: boolean;
  onClose: () => void;
  classDataList: ClassData[];
  setClassDataList: React.Dispatch<React.SetStateAction<ClassData[]>>;
}

const CourseEditor: React.FC<CourseEditorProps> = ({ course, isOpen, onClose, classDataList, setClassDataList }) => {
  const [classData, setClassData] = useState<ClassData>(course);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setClassData(prevData => ({ ...prevData, [name as string]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent<"cancellation" | "inProgress" | "completed" | "failed">) => {
    const { name, value } = event.target;
    setClassData(prevData => ({ ...prevData, [name as string]: value }));
  };

  const handleDayOfWeekChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClassData(prevData => ({ ...prevData, dayOfWeek: event.target.value.split(',').map(day => day.trim()) }));
  };

  const handleAttendanceChange = (index: number, field: keyof Attendance, value: string) => {
    const newAttendances = [...classData.attendances];
    newAttendances[index] = { ...newAttendances[index], [field]: value };
    setClassData(prevData => ({ ...prevData, attendances: newAttendances }));
  };

  const handleAssignmentChange = (index: number, field: keyof Assignment, value: string | number | null) => {
    const newAssignments = [...classData.assignments];
    newAssignments[index] = { ...newAssignments[index], [field]: value };
    setClassData(prevData => ({ ...prevData, assignments: newAssignments }));
  };

  const addAttendance = () => {
    setClassData(prevData => ({
      ...prevData,
      attendances: [...prevData.attendances, { date: '', status: 'present' }],
    }));
  };

  const addAssignment = () => {
    setClassData(prevData => ({
      ...prevData,
      assignments: [...prevData.assignments, { name: '', dueDate: '', submittedDate: null, score: null, maxScore: 100 }],
    }));
  };

  const removeAttendance = (index: number) => {
    setClassData(prevData => ({
      ...prevData,
      attendances: prevData.attendances.filter((_, i) => i !== index),
    }));
  };

  const removeAssignment = (index: number) => {
    setClassData(prevData => ({
      ...prevData,
      assignments: prevData.assignments.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Saving class data:", classData);
    saveClassData(classData); 
    console.log(classData);
    setClassDataList(prevList => {
      const newList = [...prevList];
      const index = newList.findIndex(data => data.courseName === classData.courseName);
      newList[index] = classData;
      return newList;
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="lg" fullWidth={true}>
      <DialogContent>
        <Box sx={{ margin: 'auto', padding: 2 }}>
          <Typography variant="h4" gutterBottom>
            コース編集
          </Typography>
          <form onSubmit={handleSubmit}>
            {/* コース情報 */}
            <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="コース名"
                    name="courseName"
                    value={classData.courseName}
                    onChange={handleChange}
                    InputProps={{ readOnly: true }} 
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="単位数"
                    name="credits"
                    value={classData.credits}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="成績"
                    name="grade"
                    value={classData.grade}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="年度"
                    name="year"
                    value={classData.year}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="学期"
                    name="term"
                    value={classData.term}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="担当教員"
                    name="instructor"
                    value={classData.instructor}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="説明"
                    name="description"
                    value={classData.description}
                    onChange={handleChange}
                    multiline
                    rows={3}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="URL"
                    name="url"
                    value={classData.url || ''}
                    onChange={handleChange}
                    type="url"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="曜日"
                    name="dayOfWeek"
                    value={classData.dayOfWeek ? classData.dayOfWeek.join(', ') : ''}
                    onChange={handleDayOfWeekChange}
                    helperText="カンマ区切りで入力してください（例：月, 木）"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>ステータス</InputLabel>
                    <Select
                      name="status"
                      value={classData.status}
                      onChange={handleSelectChange}
                      required
                    >
                      <MenuItem value="cancellation">キャンセル</MenuItem>
                      <MenuItem value="inProgress">進行中</MenuItem>
                      <MenuItem value="completed">完了</MenuItem>
                      <MenuItem value="failed">不合格</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>

            {/* 出席状況 */}
            <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
              <Typography variant="h6" gutterBottom>
                出席状況
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>日付</TableCell>
                      <TableCell>状態</TableCell>
                      <TableCell>操作</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(classData.attendances || []).map((attendance, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <TextField
                            type="date"
                            value={attendance.date}
                            onChange={(e) => handleAttendanceChange(index, 'date', e.target.value)}
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            value={attendance.status}
                            onChange={(e) => handleAttendanceChange(index, 'status', e.target.value)}
                            fullWidth
                          >
                            <MenuItem value="present">出席</MenuItem>
                            <MenuItem value="absent">欠席</MenuItem>
                            <MenuItem value="late">遅刻</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => removeAttendance(index)}>削除</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button startIcon={<AddIcon />} onClick={addAttendance} sx={{ mt: 2 }}>
                出席を追加
              </Button>
            </Paper>

            {/* 課題 */}
            <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
              <Typography variant="h6" gutterBottom>
                課題
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>課題名</TableCell>
                      <TableCell>締切日</TableCell>
                      <TableCell>提出日</TableCell>
                      <TableCell>得点</TableCell>
                      <TableCell>満点</TableCell>
                      <TableCell>操作</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(classData.assignments || []).map((assignment, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <TextField
                            value={assignment.name}
                            onChange={(e) => handleAssignmentChange(index, 'name', e.target.value)}
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="date"
                            value={assignment.dueDate}
                            onChange={(e) => handleAssignmentChange(index, 'dueDate', e.target.value)}
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="date"
                            value={assignment.submittedDate || ''}
                            onChange={(e) => handleAssignmentChange(index, 'submittedDate', e.target.value || null)}
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            value={assignment.score !== null ? assignment.score : ''}
                            onChange={(e) => handleAssignmentChange(index, 'score', e.target.value ? Number(e.target.value) : null)}
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            value={assignment.maxScore}
                            onChange={(e) => handleAssignmentChange(index, 'maxScore', Number(e.target.value))}
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => removeAssignment(index)} color="error">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button startIcon={<AddIcon />} onClick={addAssignment} sx={{ mt: 2 }}>
                課題を追加
              </Button>
            </Paper>
            <DialogActions>
              <Button type="submit" variant="contained" color="primary">
                保存
              </Button>
              <Button onClick={onClose} color="secondary">
                キャンセル
              </Button>
            </DialogActions>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CourseEditor;

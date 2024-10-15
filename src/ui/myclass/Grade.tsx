import React, { useState, useMemo, useEffect } from 'react';
import { Edit as EditIcon, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { calculateAttendanceRate } from '@/utils/myclass/calculateAttendanceRate';
import AttendanceDetails from '@/ui/myclass/AttendanceDetails';
import AssignmentDetails from '@/ui/myclass/AssignmentDetails';
import {
  Chip,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { ClassData } from '@/types/type';
import { getClassData } from '@/utils/indexedDB';
import { initialData } from '@/data/testData'; // Fixed line

//全角
const gradeToGPA: { [key: string]: number } = {
  'Ｓ': 4.0,
  'Ａ': 3.0,
  'Ｂ': 2.0,
  'Ｃ': 1.0,
  'Ｆ': 0.0,
  'Ｒ': 0.0,
  'Ｗ': 0.0,
  '?': 0.0,
};

const gradeColors: { [key: string]: { bg: string, text: string } } = {
  'Ｓ': { bg: '#FFE5CC', text: '#FF8C00' }, 
  'Ａ': { bg: '#E5F9E5', text: '#00FF00' },
  'Ｂ': { bg: '#E5F2FF', text: '#0000FF' },
  'Ｃ': { bg: '#F2E5F2', text: '#800080' },
  'Ｆ': { bg: '#FFE5E5', text: '#FF0000' },
  'Ｒ': { bg: '#FAEBD7', text: '#FFD700' },
  'Ｗ': { bg: '#F2F2F2', text: '#808080' },
  '?': { bg: '#F2F2F2', text: '#808080' }, 
};
const statusColors = {
  cancellation: '#FFA500',
  inProgress: '#4169E1',
  completed: '#32CD32',
  failed: '#FF0000',
};

const statusLabels = {
  cancellation: '履修中止',
  inProgress: '進行中',
  completed: '完了',
  failed: '不合格',
};
const COLORS = ['#4CAF50', '#2196F3', '#FFC107', '#FF5722', '#F44336', '#9E9E9E'];

function Row({ row, onEdit }: { row: ClassData; onEdit: (course: ClassData) => void }) {
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
        <TableCell
          align="center"
        >
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
          <IconButton onClick={() => onEdit(row)}>
            <EditIcon />
          </IconButton>
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


export default function EnhancedGradeAnalysis() {
  const [classData, setClassData] = useState<ClassData[]>(initialData); // Fixed line
  //useEffect(() => {
  //  (async () => {
  //    const data = await getClassData();
  //    setClassData(data);
  //  })();
  //}, []);
  
  const [yearTermFilters, setYearTermFilters] = useState<{ [year: string]: string[] }>({});
  const [tabValue, setTabValue] = useState(0);

  const years = useMemo(() => [...new Set(classData.map(item => item.year))], [classData]);
  const terms = useMemo(() => [...new Set(classData.map(item => item.term))], [classData]);

  const filteredData = useMemo(() => {
    return classData.filter(item => {
      const yearFilters = yearTermFilters[item.year];
      return !yearFilters || yearFilters.length === 0 || yearFilters.includes(item.term);
    });
  }, [classData, yearTermFilters]);

  const { totalCredits, averageGPA, gradeDistribution, termGPA } = useMemo(() => {
    let totalCredits = 0;
    let totalGradePoints = 0;
    const gradeCount: { [key: string]: number } = { 'Ｓ': 0, 'Ａ': 0, 'Ｂ': 0, 'Ｃ': 0, 'Ｆ': 0, 'Ｒ': 0, 'Ｗ': 0 };
    const termData: { [key: string]: { credits: number, points: number } } = {};

    filteredData.forEach(item => {
      const credits = parseInt(item.credits);
      totalCredits += credits;
      gradeCount[item.grade] += credits;

      if (item.grade !== 'Ｒ') {
        const points = credits * (gradeToGPA[item.grade] || 0);
        totalGradePoints += points;

        const termKey = `${item.year} ${item.term}`;
        if (!termData[termKey]) {
          termData[termKey] = { credits: 0, points: 0 };
        }
        termData[termKey].credits += credits;
        termData[termKey].points += points;
      }
    });

    const averageGPA = totalGradePoints / totalCredits || 0;
    const gradeDistribution = Object.entries(gradeCount)
    .map(([grade, count]) => ({
      grade,
      count,
      percentage: (count / totalCredits) * 100
    }))
    .filter(item => item.percentage > 0);

    const termGPA = Object.entries(termData).map(([term, data]) => ({
      term,
      gpa: Number((data.points / data.credits).toFixed(2))
    })).sort((a, b) => a.term.localeCompare(b.term));

    return { totalCredits, averageGPA, gradeDistribution, termGPA };
  }, [filteredData]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleTermFilterChange = (year: string, term: string) => {
    setYearTermFilters(prev => {
      const yearFilters = prev[year] || [];
      const updatedYearFilters = yearFilters.includes(term)
        ? yearFilters.filter(t => t !== term)
        : [...yearFilters, term];

      return {
        ...prev,
        [year]: updatedYearFilters
      };
    });
  };

  return (
    <Box sx={{  margin: 'auto', p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
      成績データ解析
    </Typography>
        <Button variant="contained" color="primary" onClick={() => console.log( filteredData, yearTermFilters)} /> 

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" component="h2" gutterBottom>
          年度・学期フィルター
        </Typography>
          {years.map(year => (
            <Accordion key={year}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{year}年度</Typography>
              </AccordionSummary>
                <AccordionDetails>
                  <FormGroup row>
                    {terms.map(term => (
                      <FormControlLabel
                        key={`${year}-${term}`}
                        control={
                          <Checkbox
                            checked={yearTermFilters[year]?.includes(term) || false}
                            onChange={() => handleTermFilterChange(year, term)}
                          />
                        }
                        label={term}
                      />
                    ))}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
          ))}
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="grade analysis tabs">
            <Tab label="テーブル" id="tab-0" aria-controls="tabpanel-0" />
            <Tab label="グラフ" id="tab-1" aria-controls="tabpanel-1" />
          </Tabs>
        </Box>

        <Box role="tabpanel" hidden={tabValue !== 0} id="tabpanel-0" aria-labelledby="tab-0">
          <TableContainer component={Paper}>
            <Table aria-label="成績データテーブル">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell align="center">状態</TableCell>
                  <TableCell align="center" >成績</TableCell>
                  <TableCell align="center">単位数</TableCell>
                  <TableCell align="center">科目名</TableCell>
                  <TableCell align="center">年度</TableCell>
                  <TableCell align="center">学期</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row, index) => (
                  <Row key={index} row={row} onEdit={(course) => console.log(course)} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box role="tabpanel" hidden={tabValue !== 1} id="tabpanel-1" aria-labelledby="tab-1">
          <Typography variant="h6" gutterBottom>学期ごとのGPA推移</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={termGPA}>
              <XAxis dataKey="term" />
              <YAxis domain={[0, 4]} tickCount={5} />
              <Tooltip 
              formatter={(value: number) => value.toFixed(2)}
              labelFormatter={(label) => `学期: ${label}`}
            />
              <Bar dataKey="gpa" fill="#8884d8" name="GPA" />
            </BarChart>
          </ResponsiveContainer>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>成績分布</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
              data={gradeDistribution}
              dataKey="percentage"
              nameKey="grade"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(2)}%`}
            >
              {gradeDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => value.toFixed(2) + '%'} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" component="h2">
          集計結果
        </Typography>
        <Typography>
          総取得単位数: {totalCredits}
        </Typography>
        <Typography>
          平均GPA: {averageGPA.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
}

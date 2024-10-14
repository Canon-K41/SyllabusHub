import React, { useState, useMemo } from 'react';
import {
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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface GradeData {
  courseName: string;
  credits: string;
  grade: string;
  year: string;
  term: string;
}

const gradeToGPA: { [key: string]: number } = {
  'S': 4.0,
  'A': 3.0,
  'B': 2.0,
  'C': 1.0,
  'F': 0.0,
  'R': 0.0,
};

const gradeColors: { [key: string]: { bg: string, text: string } } = {
  'S': { bg: '#E8F5E9', text: '#1B5E20' },
  'A': { bg: '#E0F2F1', text: '#004D40' },
  'B': { bg: '#FFF3E0', text: '#E65100' },
  'C': { bg: '#FFEBEE', text: '#B71C1C' },
  'F': { bg: '#FFCDD2', text: '#D50000' },
  'R': { bg: '#F5F5F5', text: '#212121' },
};

const COLORS = ['#4CAF50', '#2196F3', '#FFC107', '#FF5722', '#F44336', '#9E9E9E'];

export default function EnhancedGradeAnalysis() {
  const initialData: GradeData[] = [
    { courseName: "基幹教育セミナー", credits: "1", grade: "R", year: "2023", term: "春学期" },
    { courseName: "微分積分学Ⅰ", credits: "2", grade: "S", year: "2023", term: "夏学期" },
    { courseName: "線形代数Ⅰ", credits: "2", grade: "A", year: "2023", term: "秋学期" },
    { courseName: "プログラミング入門", credits: "2", grade: "S", year: "2024", term: "冬学期" },
    { courseName: "データ構造とアルゴリズム", credits: "2", grade: "B", year: "2024", term: "春学期" },
    { courseName: "統計学", credits: "2", grade: "A", year: "2024", term: "夏学期" },
    { courseName: "機械学習入門", credits: "2", grade: "S", year: "2025", term: "秋学期" },
    { courseName: "データベース", credits: "2", grade: "B", year: "2025", term: "冬学期" },
    { courseName: "情報理論", credits: "2", grade: "A", year: "2025", term: "前期" },
    { courseName: "コンピュータネットワーク", credits: "2", grade: "B", year: "2025", term: "後期" },
  ];

  const [data] = useState<GradeData[]>(initialData);
  const [yearTermFilters, setYearTermFilters] = useState<{ [year: string]: string[] }>({});
  const [tabValue, setTabValue] = useState(0);

  const years = useMemo(() => [...new Set(data.map(item => item.year))], [data]);
  const terms = useMemo(() => [...new Set(data.map(item => item.term))], [data]);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const yearFilters = yearTermFilters[item.year];
      return !yearFilters || yearFilters.length === 0 || yearFilters.includes(item.term);
    });
  }, [data, yearTermFilters]);

  const { totalCredits, averageGPA, gradeDistribution, termGPA } = useMemo(() => {
    let totalCredits = 0;
    let totalGradePoints = 0;
    const gradeCount: { [key: string]: number } = { 'S': 0, 'A': 0, 'B': 0, 'C': 0, 'F': 0, 'R': 0 };
    const termData: { [key: string]: { credits: number, points: number } } = {};

    filteredData.forEach(item => {
      const credits = parseInt(item.credits);
      totalCredits += credits;
      gradeCount[item.grade] += credits;
      
      if (item.grade !== 'R') {
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
    <Box sx={{ maxWidth: 800, margin: 'auto', p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        成績データ解析
      </Typography>
      
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
                <TableCell>科目名</TableCell>
                <TableCell align="right">単位数</TableCell>
                <TableCell align="right">成績</TableCell>
                <TableCell align="right">年度</TableCell>
                <TableCell align="right">学期</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">{row.courseName}</TableCell>
                  <TableCell align="right">{row.credits}</TableCell>
                  <TableCell 
                    align="right" 
                    style={{ 
                      backgroundColor: gradeColors[row.grade].bg,
                      color: gradeColors[row.grade].text,
                      fontWeight: 'bold'
                    }}
                  >
                    {row.grade}
                  </TableCell>
                  <TableCell align="right">{row.year}</TableCell>
                  <TableCell align="right">{row.term}</TableCell>
                </TableRow>
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

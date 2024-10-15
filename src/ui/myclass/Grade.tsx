import React, { useState, useMemo, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Box, Button, Checkbox, FormControlLabel, FormGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Tab, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { ClassData } from '@/types/type';
import { getClassData } from '@/utils/indexedDB';
import { gradeToGPA, gradeColors, statusColors, statusLabels, COLORS } from '@/types/constants';
import Row from '@/ui/myclass/Row';

export default function EnhancedGradeAnalysis() {
  const [classData, setClassData] = useState<ClassData[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getClassData();
      setClassData(data);
    })();
  }, []);

  const [tabValue, setTabValue] = useState(0);

  const years = useMemo(() => [...new Set(classData.map(item => item.year))], [classData]);
  const terms = useMemo(() => [...new Set(classData.map(item => item.term))], [classData]);



  const initialYearTermFilters: { [year: string]: string[] } = years.reduce((acc, year) => {
    acc[year] = [...terms];
    return acc;
  }, {} as { [year: string]: string[] });
  const [yearTermFilters, setYearTermFilters] = useState<{ [year: string]: string[] }>(initialYearTermFilters);

  console.log(yearTermFilters);
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

      if (item.credits !== '?') {
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
    <Box sx={{ margin: 'auto', p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        成績データ解析
      </Typography>
      <Button variant="contained" color="primary" onClick={() => console.log(filteredData, yearTermFilters)} />

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
                        onChange={() => handleTermFilterChange(year, term)}
                        defaultChecked={true}
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
                <TableCell align="center">成績</TableCell>
                <TableCell align="center">単位数</TableCell>
                <TableCell align="center">科目名</TableCell>
                <TableCell align="center">年度</TableCell>
                <TableCell align="center">学期</TableCell>
                <TableCell align="center">編集</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <Row key={index} row={row} classData={classData} setClassData={setClassData} />
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

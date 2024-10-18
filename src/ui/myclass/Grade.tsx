import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Box,  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Tab, Typography, Checkbox } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { ClassData } from '@/types/type';
import { getClassData } from '@/utils/indexedDB';
import UpdataButton from "@/ui/myclass/UpdateButton";
import { gradeToGPA, COLORS } from '@/types/constants';
import Row from '@/ui/myclass/Row';
import Filters from '@/ui/myclass/Filters';

export default function EnhancedGradeAnalysis() {
  const [classData, setClassData] = useState<ClassData[]>([]);
  const [filteredData, setFilteredData] = useState<ClassData[]>([]);
  const [selectedTerms, setSelectedTerms] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getClassData();
      setClassData(data);
    })();
  }, []);

  const [tabValue, setTabValue] = useState(0);

  const termOrder = ['春', '夏', '前', '前期集中', '秋', '冬', '後', '後期集中', '通年'];

  const { gradeDistribution, termGPA  } = useMemo(() => {
    let totalCredits = 0;
    let totalGradePoints = 0;
    const gradeCount: { [key: string]: number } = { 'Ｓ': 0, 'Ａ': 0, 'Ｂ': 0, 'Ｃ': 0, 'Ｆ': 0, 'Ｒ': 0, 'Ｗ': 0, '?' : 0 };
    const termData: { [key: string]: { credits: number, points: number, classes: number } } = {};
    let numberOfR = 0;

    filteredData.forEach(item => {
      if(item.grade !== '?' ){
        if(item.grade === 'Ｒ'){
          numberOfR++;
        }
        const credits = parseFloat(item.credits);
        totalCredits += credits;
        gradeCount[item.grade] += credits;

        const points = credits * (gradeToGPA[item.grade] || 0);
        totalGradePoints += points;

        const termKey = `${item.year} ${item.term}`;
        if (!termData[termKey]) {
          termData[termKey] = { credits: 0, points: 0, classes: 0 };
        }
        termData[termKey].credits += credits;
        termData[termKey].points += points;
        termData[termKey].classes += 1;
      }
    });

    //GPAにおいて、Rは除外する
    const averageGPA = totalCredits > 0 ? totalGradePoints / (totalCredits - numberOfR ) : 0;
    const gradeDistribution = Object.entries(gradeCount)
      .map(([grade, count]) => ({
        grade,
        count,
        percentage: totalCredits > 0 ? (count / totalCredits) * 100 : 0
      }))
      .filter(item => item.percentage > 0);

    const termGPA = Object.entries(termData).map(([term, data]) => ({
      term,
      gpa: data.credits > 0 ? Number((data.points / data.credits).toFixed(2)) : 0,
      classes: data.classes,
      totalCredits: data.credits,
      gpt: data.points
    })).sort((a, b) => {
      const [yearA, termA] = a.term.split(' ');
      const [yearB, termB] = b.term.split(' ');
      if (yearA !== yearB) {
        return yearA.localeCompare(yearB);
      }
      return termOrder.indexOf(termA) - termOrder.indexOf(termB);
    });

    return { totalCredits, averageGPA, gradeDistribution, termGPA, gradeCount, termClassCount: termData };
  }, [filteredData]);

  useEffect(() => {
    setSelectedTerms(termGPA.map(term => term.term));
  }, [termGPA]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleFilterChange = useCallback((filteredData: ClassData[]) => {
    setFilteredData(filteredData);
  }, []);

  const handleTermSelect = (term: string) => {
    setSelectedTerms(prevSelectedTerms =>
      prevSelectedTerms.includes(term)
        ? prevSelectedTerms.filter(t => t !== term)
        : [...prevSelectedTerms, term]
    );
  };

  const selectedTermData = termGPA.filter(term => selectedTerms.includes(term.term));
  const selectedTotalClasses = selectedTermData.reduce((acc, term) => acc + term.classes, 0);
  const selectedTotalCredits = selectedTermData.reduce((acc, term) => acc + term.totalCredits, 0);
  const selectedTotalGPT = selectedTermData.reduce((acc, term) => acc + term.gpt, 0);
  const selectedAverageGPA = selectedTotalCredits > 0
    ? selectedTotalGPT / selectedTotalCredits
    : 0;

  return (
    <Box sx={{ margin: 'auto', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'left' }}>
          成績データ解析
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <UpdataButton setClassData={setClassData} />
        </Box>
      </Box>

      <Accordion defaultExpanded={false}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>フィルター</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Filters classData={classData} onFilterChange={handleFilterChange} />
        </AccordionDetails>
      </Accordion>

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
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" component="h2">
            集計結果
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="集計結果テーブル">
              <TableHead>
                <TableRow>
                  <TableCell align="center">選択</TableCell>
                  <TableCell align="center">学期</TableCell>
                  <TableCell align="center">GPA</TableCell>
                  <TableCell align="center">GPT</TableCell>
                  <TableCell align="center">授業数</TableCell>
                  <TableCell align="center">総合単位数</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {termGPA.map((termData, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      <Checkbox
                        checked={selectedTerms.includes(termData.term)}
                        onChange={() => handleTermSelect(termData.term)}
                      />
                    </TableCell>
                    <TableCell align="center">{termData.term}</TableCell>
                    <TableCell align="center">{termData.gpa}</TableCell>
                    <TableCell align="center">{termData.gpt}</TableCell>
                    <TableCell align="center">{termData.classes}</TableCell>
                    <TableCell align="center">{termData.totalCredits}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell align="center">合計</TableCell>
                  <TableCell align="center">-</TableCell>
                  <TableCell align="center">{selectedAverageGPA.toFixed(2)}</TableCell>
                  <TableCell align="center">{selectedTotalGPT}</TableCell>
                  <TableCell align="center">{selectedTotalClasses}</TableCell>
                  <TableCell align="center">{selectedTotalCredits}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}

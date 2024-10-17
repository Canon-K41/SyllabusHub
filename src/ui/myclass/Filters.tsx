import React, { useState, useMemo, useEffect } from 'react';
import { Box, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { ClassData } from '@/types/type';

interface FiltersProps {
  classData: ClassData[];
  onFilterChange: (filteredData: ClassData[]) => void;
}

const Filters: React.FC<FiltersProps> = ({ classData, onFilterChange }) => {
  const years = useMemo(() => [...new Set(classData.map(item => item.year))], [classData]);
  const terms = useMemo(() => ['春学期', '夏学期', '秋学期', '冬学期', '前', '後', '通年', '前期集中'], []);
  const statuses = ['cancellation', 'inProgress', 'completed', 'failed'];
  const grades = ['Ｓ', 'Ａ', 'Ｂ', 'Ｃ', 'Ｆ', 'Ｒ', 'Ｗ', '?'];

  const initialGradeFilters = grades.reduce((acc, grade) => {
    acc[grade] = true;
    return acc;
  }, {} as { [grade: string]: boolean });
  const [gradeFilters, setGradeFilters] = useState<{ [grade: string]: boolean }>(initialGradeFilters);

  const initialYearFilters = useMemo(() => {
    return years.reduce((acc, year) => {
      acc[year] = true;
      return acc;
    }, {} as { [year: string]: boolean });
  }, [years]);

  const initialTermFilters = useMemo(() => {
    return terms.reduce((acc, term) => {
      acc[term] = true;
      return acc;
    }, {} as { [term: string]: boolean });
  }, [terms]);

  const initialStatusFilters = useMemo(() => {
    return statuses.reduce((acc, status) => {
      acc[status] = true;
      return acc;
    }, {} as { [status: string]: boolean });
  }, [statuses]);

  const [yearFilters, setYearFilters] = useState<{ [year: string]: boolean }>(initialYearFilters);
  const [termFilters, setTermFilters] = useState<{ [term: string]: boolean }>(initialTermFilters);
  const [statusFilters, setStatusFilters] = useState<{ [status: string]: boolean }>(initialStatusFilters);

  useEffect(() => {
    const filteredData = classData.filter(item => {
      const gradeFilter = gradeFilters[item.grade];
      const yearFilter = yearFilters[item.year];
      const termFilter = termFilters[item.term];
      const statusFilter = statusFilters[item.status];
      return gradeFilter && yearFilter && termFilter && statusFilter;
    });
    onFilterChange(filteredData);
  }, [classData, gradeFilters, yearFilters, termFilters, statusFilters, onFilterChange]);

  const handleGradeFilterChange = (grade: string) => {
    setGradeFilters(prev => ({
      ...prev,
      [grade]: !prev[grade]
    }));
  };

  const handleYearFilterChange = (year: string) => {
    setYearFilters(prev => ({
      ...prev,
      [year]: !prev[year]
    }));
  };

  const handleTermFilterChange = (term: string) => {
    setTermFilters(prev => ({
      ...prev,
      [term]: !prev[term]
    }));
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilters(prev => ({
      ...prev,
      [status]: !prev[status]
    }));
  };

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          年度フィルター
        </Typography>
        <FormGroup row>
          {years.map(year => (
            <FormControlLabel
              key={year}
              control={
                <Checkbox
                  checked={yearFilters[year]}
                  onChange={() => handleYearFilterChange(year)}
                />
              }
              label={year}
            />
          ))}
        </FormGroup>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          学期フィルター
        </Typography>
        <FormGroup row>
          {terms.map(term => (
            <FormControlLabel
              key={term}
              control={
                <Checkbox
                  checked={termFilters[term]}
                  onChange={() => handleTermFilterChange(term)}
                />
              }
              label={term}
            />
          ))}
        </FormGroup>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          状態フィルター
        </Typography>
        <FormGroup row>
          {statuses.map(status => (
            <FormControlLabel
              key={status}
              control={
                <Checkbox
                  checked={statusFilters[status]}
                  onChange={() => handleStatusFilterChange(status)}
                />
              }
              label={status}
            />
          ))}
        </FormGroup>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          成績フィルター
        </Typography>
        <FormGroup row>
          {grades.map(grade => (
            <FormControlLabel
              key={grade}
              control={
                <Checkbox
                  checked={gradeFilters[grade]}
                  onChange={() => handleGradeFilterChange(grade)}
                />
              }
              label={grade}
            />
          ))}
        </FormGroup>
      </Box>
    </Box>
  );
};

export default Filters;

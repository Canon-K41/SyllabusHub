import React, { useState, useMemo, useEffect } from 'react';
import { Box, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { ClassData } from '@/types/type';

interface FiltersProps {
  classData: ClassData[];
  onFilterChange: (filteredData: ClassData[]) => void;
}

const Filters: React.FC<FiltersProps> = ({ classData, onFilterChange }) => {
  const years = useMemo(() => [...new Set(classData.map(item => item.year))], [classData]);
  const terms = useMemo(() => [...new Set(classData.map(item => item.term))], [classData]);
  const statuses = useMemo(() => [...new Set(classData.map(item => item.status))], [classData]);
  const grades = useMemo(() => [...new Set(classData.map(item => item.grade))], [classData]);
  const field = useMemo(() => [...new Set(classData.map(item => item.field))], [classData]);

  const initialGradeFilters = grades.reduce((acc, grade) => {
    acc[grade] = true;
    return acc;
  }, {} as { [grade: string]: boolean });
  const [gradeFilters, setGradeFilters] = useState<{ [grade: string]: boolean }>(initialGradeFilters);

  const [yearFilters, setYearFilters] = useState(years);

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

  const initialFieldFilter = useMemo(() => {
    return field.reduce((acc, isBaseSubject) => {
      acc[isBaseSubject] = true;
      return acc;
    }, {} as { [isBaseSubject: string]: boolean });
  }, [field]);

  const [termFilters, setTermFilters] = useState<{ [term: string]: boolean }>(initialTermFilters);
  const [statusFilters, setStatusFilters] = useState<{ [status: string]: boolean }>(initialStatusFilters);
  const [fieldFilters, setFieldFilters] = useState<{ [field: string]: boolean }>(initialFieldFilter);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (Object.keys(initialTermFilters).length > 0 && Object.keys(initialStatusFilters).length > 0) {
      setIsLoading(false);
    }
  }, [initialTermFilters, initialStatusFilters]);

  useEffect(() => {
    if (!isLoading) {
      const filteredData = classData.filter(item => {
        const gradeFilter = !gradeFilters[item.grade];
        const yearFilter = !yearFilters.includes(item.year);
        const termFilter = !termFilters[item.term];
        const statusFilter = !statusFilters[item.status];
        const field = !fieldFilters[item.field];
        return gradeFilter && yearFilter && termFilter && statusFilter && field;
      });
      onFilterChange(filteredData);
    }
  }, [classData, gradeFilters, yearFilters, termFilters, statusFilters, onFilterChange, isLoading]);

  const handleGradeFilterChange = (grade: string) => {
    setGradeFilters(prev => ({
      ...prev,
      [grade]: !prev[grade]
    }));
  };

  const handleYearFilterChange = (year: string) => {
    if (yearFilters.includes(year)) {
      setYearFilters(yearFilters.filter(item => item !== year));
    } else {
      setYearFilters([...yearFilters, year]);
    }
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

  const handleFieldFilterChange = (isBaseSubject: string) => {
    setFieldFilters(prev => ({
      ...prev,
      [isBaseSubject]: !prev[isBaseSubject]
    }));
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

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
                  checked={!yearFilters.includes(year)}
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
                  checked={!termFilters[term]}
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
          領域フィルター
        </Typography>
        <FormGroup row>
          {field.map(field=> (
            <FormControlLabel
              key={field}
              control={
                <Checkbox
                  checked={!fieldFilters[field]}
                  onChange={() => handleFieldFilterChange(field)}

                />
              }
              label={field}
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
                  checked={!statusFilters[status]}
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
                  checked={!gradeFilters[grade]}
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

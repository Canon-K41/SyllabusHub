"use client"

import React, { useState, useEffect } from 'react'
import { 
  ThemeProvider, 
  createTheme, 
  Grid, 
  Paper, 
  Typography, 
  Box 
} from '@mui/material'
import { getClassData } from '@/utils/indexedDB'
import { ClassData } from '@/types/type'

type TimetableData = {
  [key: string]: string
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

export default function StylishTimetable() {
  const [classData, setClassData] = useState<ClassData[]>([])
  const [timetableData, setTimetableData] = useState<TimetableData>({})

  const days = ['月', '火', '水', '木', '金']
  const periods = ['1', '2', '3', '4', '5']

  useEffect(() => {
    async function fetchData() {
      const data = await getClassData()
      setClassData(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const data: TimetableData = {}
    classData.forEach(({ dayOfWeek, term, courseName }) => {
      dayOfWeek.forEach(day => {
        data[`${day}${term}`] = courseName
      })
    })
    setTimetableData(data)
  }, [classData])

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h4" gutterBottom>
          時間割
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={2}></Grid>
          {days.map(day => (
            <Grid item xs={2} key={day}>
              <Typography variant="subtitle1" align="center" fontWeight="bold">
                {day}
              </Typography>
            </Grid>
          ))}
          {periods.map(period => (
            <React.Fragment key={period}>
              <Grid item xs={2}>
                <Typography variant="subtitle1" align="center" fontWeight="bold">
                  {period}
                </Typography>
              </Grid>
              {days.map(day => (
                <Grid item xs={2} key={`${day}${period}`}>
                  <Paper 
                    elevation={3} 
                    sx={{ 
                      height: 100, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      backgroundColor: timetableData[`${day}${period}`] ? 'primary.light' : 'inherit'
                    }}
                  >
                    <Typography>
                      {timetableData[`${day}${period}`] || ''}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </React.Fragment>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  )
}

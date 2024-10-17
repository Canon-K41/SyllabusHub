import React from 'react';
import { LinearProgress, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Assignment } from '@/types/type';

interface AssignmentDetailsProps {
  assignments: Assignment[];
}

const AssignmentDetails: React.FC<AssignmentDetailsProps> = ({ assignments }) => {
  const submittedAssignments = assignments.filter(a => a.submittedDate).length;
  const totalAssignments = assignments.length;

  return (
    <>
      <LinearProgress variant="determinate" value={(submittedAssignments / totalAssignments) * 100} />
      <Typography variant="body2">{`${submittedAssignments}/${totalAssignments} (${Math.round((submittedAssignments / totalAssignments) * 100)}%)`}</Typography>
      <Table size="small" aria-label="assignments">
        <TableHead>
          <TableRow>
            <TableCell>課題名</TableCell>
            <TableCell>提出状況</TableCell>
            <TableCell>得点</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assignments.map((assignment, index) => (
            <TableRow key={index}>
              <TableCell>{assignment.name}</TableCell>
              <TableCell>{assignment.submittedDate || '未提出'}</TableCell>
              <TableCell>{assignment.score !== null ? `${assignment.score}/${assignment.maxScore}` : '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default AssignmentDetails;

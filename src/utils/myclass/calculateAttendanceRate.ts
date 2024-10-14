import { Attendance } from '@/types/type';

export function calculateAttendanceRate(attendances: Attendance[], untilDate: string): number {
  const filteredAttendances = attendances.filter(a => new Date(a.date) <= new Date(untilDate));
  const totalClasses = filteredAttendances.length;
  const attendedClasses = filteredAttendances.filter(a => a.status === 'present').length;
  return totalClasses > 0 ? (attendedClasses / totalClasses) * 100 : 0;
}

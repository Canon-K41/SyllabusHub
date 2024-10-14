export interface Attendance {
  date: string;
  status: 'absent' | 'present' | 'late';
}

export interface Assignment {
  name: string;
  dueDate: string;
  submittedDate: string | null;
  score: number | null;
  maxScore: number;
}

export interface Course {
  courseName: string;
  credits: string;
  grade: string;
  year: string;
  term: string;
  courseCode: string;
  studentId: string;
  instructor: string;
  date: string;
  status: 'notStarted' | 'inProgress' | 'completed' | 'failed';
  notifications?: string;
  attendances: Attendance[];
  assignments: Assignment[];
}

export interface classData{
  class_id: string,
  title: string,
  instructor: string,
  university: string,
  description: string,
  url: string,
  duration: string,
  exdata: string[],
  rrule: {
    freq: string,
    interval: number,
    count: number,
    byweekday: string[],
    dtstart: string,
  }
}


export interface userInfo{ 
  moodleAccount: string,
  password: string,
  nickname: string,
  grade: string,
  faculty: string,
  course: string,
}
  

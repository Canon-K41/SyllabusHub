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
  fieldCode: string;
  courseId: string;
  instructor: string;
  date: string;
  status: 'cancellation' | 'inProgress' | 'completed' | 'failed';
  attendances: Attendance[];
  assignments: Assignment[];
}

export interface ClassData extends Course{
  url: string | null;
  dayOfWeek: string[];
}

export interface UserInfo{ 
  moodleAccount: string,
  password: string,
  nickname: string,
  grade: string,
  faculty: string,
  course: string,
}
  

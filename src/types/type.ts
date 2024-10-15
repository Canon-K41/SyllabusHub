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

export interface ClassData {
  courseName: string;
  credits: string;
  grade: string;
  year: string;
  term: string;
  instructor: string;
  description: string;
  url: string | null;
  dayOfWeek: string[];
  status: 'cancellation' | 'inProgress' | 'completed' | 'failed';
  attendances: Attendance[];
  assignments: Assignment[];
}


export interface UserInfo{ 
  userName: string,
  studentId: string,
  moodleAccount: string,
  password: string,
  nickname: string,
  grade: string,
  faculty: string,
  course: string,
}
  
export interface Link {
  year: string | null;
  term: string | null;
  weekOfDateParts: string[];
  cleanTitles: string[] | null;
  instructor: string | null;
  url: string | null;
}


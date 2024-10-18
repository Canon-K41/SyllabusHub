export interface Attendance {
  date: string;
  status: 'absent' | 'present' | 'late';
}

export interface Assignment {
  name: string;
  dueDate: string;
  url: string;
  submittedDate: string | null;
  status: 'delated' | 'submitted' | 'unsubmitted';
  score: number | null;
  maxScore: number;
}
export type Status = '履修取消' | '履修中' | '単位修得済' | '単位未修得';
export type Field = '専攻教育科目'　| '基幹教育科目' | 'その他';

export interface HomeworkItem {
  href: string;
  classInfo: string;
  cleanTitles: string;
  homeworkTitle: string;
  deadline: string;
}

export interface ClassData extends CampasmateData {
  place: string | null;
  description: string | null;
  url: string | null;
  dayOfWeek: string[] ;
  status: Status;
  attendances: Attendance[];
  assignments: Assignment[];
}

export interface CampasmateData {
  courseName: string;
  credits: string;
  grade: string;
  year: string;
  term: string;
  field: Field;
  instructor: string;
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


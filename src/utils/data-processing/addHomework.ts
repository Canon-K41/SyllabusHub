import { callHomework } from '@/utils/callApi/callHomework';
import { HomeworkItem, ClassData, Assignment } from '@/types/type';
import { getClassData, saveClassData } from '@/utils/indexedDB';

export const addHomework = async () => {
  const data = await callHomework();
  const classData = await getClassData();
  if (!data || !classData) {
    throw new Error('Data could not be retrieved. Try again later.');
  }
  classData.forEach((classItem: ClassData) => {
    data.forEach((homeworkItem: HomeworkItem) => {
  const assignments: Assignment = {
    name: homeworkItem.classInfo,
    dueDate: homeworkItem.deadline,
    href: homeworkItem.href,
    submittedDate: '',
    status: 'unsubmitted',
    score: 0,
    maxScore: 100,
    }
      if (homeworkItem.cleanTitles?.includes(classItem.courseName)) {
        classItem.assignments.push(assignments);
        saveClassData(classItem);
      }
    });

  });
}




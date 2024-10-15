import { callClassInfo } from '@/utils/callApi/callClassInfo';
import { saveClassData } from '@/utils/indexedDB';
import { ClassData, Link } from '@/types/type';

type Status = 'cancellation' | 'inProgress' | 'completed' | 'failed';

export const toClassData = async (): Promise<ClassData[]> => {
  const { moodleLinkData, campasmateClassData } = await callClassInfo();
  if(!moodleLinkData || !campasmateClassData ) {
    throw new Error('Data could not be retrieved.Try again later.');
  }

  // campasmateClassDataが配列であることを保証
  const campasmateClassArray = Array.isArray(campasmateClassData) ? campasmateClassData : [];

  const classData: ClassData[] = [];

  campasmateClassArray.forEach((classItem: ClassData) => {
    let status: Status = 'completed';
    if (!classItem.grade) {
      status = 'inProgress';
    } else if (classItem.grade === 'Ｆ') {
      status = 'failed';
    } else if (classItem.grade === 'Ｗ') {
      status = 'cancellation';
    }
    if(!classItem.credits) {
      classItem.credits = '?';
    }
    if(!classItem.grade) {
      classItem.grade = '?';
    }
    if(!classItem.instructor) {
      classItem.instructor = '?';
    }

    if(!classItem.term) {
      classItem.term = '?';
    }
    if(!classItem.year) {
      classItem.year = '?';
    }
    if(!classItem.description) {
      classItem.description = '未設定';
    }
    if(!classItem.url) {
      classItem.url = '';
    }
    if(!classItem.dayOfWeek) {
      classItem.dayOfWeek = [];
    }

    classData.push({
      ...classItem,
      status,
      attendances: [],
      assignments: [],
    });
  });


  classData.forEach((classItem) => {
    moodleLinkData.forEach((moodleLink: Link) => {
      if (moodleLink.cleanTitles?.includes(classItem.courseName)) { 
        classItem.url = moodleLink.url;
        classItem.dayOfWeek = moodleLink.weekOfDateParts;
      }
    });
  });

  console.log("Final class data:", classData);

  classData.forEach((classItem) => {
    saveClassData(classItem);
  });
  return classData;
};

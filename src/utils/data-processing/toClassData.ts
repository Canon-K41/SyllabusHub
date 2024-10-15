import { callClassInfo } from '@/utils/callApi/callClassInfo';
import { ClassData, Link } from '@/types/type';

type Status = 'cancellation' | 'inProgress' | 'completed' | 'failed';

export const toClassData = async (): Promise<ClassData[]> => {
  const { moodleLinkData, campasmateClassData } = await callClassInfo();
  if(moodleLinkData === null || campasmateClassData === null) {
    throw new Error('Data could not be retrieved.Try again later.');
  }

  // campasmateClassDataが配列であることを保証
  const campasmateClassArray = Array.isArray(campasmateClassData) ? campasmateClassData : [];

  const classData: ClassData[] = [];

  campasmateClassArray.forEach((classItem: ClassData) => {
    let status: Status = 'completed';
    if (!classItem.grade) {
      status = 'inProgress';
    } else if (classItem.grade === 'F') {
      status = 'failed';
    } else if (classItem.grade === 'W') {
      status = 'cancellation';
    }

    classData.push({
      ...classItem,
      status,
      description: '',
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

  return classData;
};

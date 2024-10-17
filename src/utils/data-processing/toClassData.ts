import { saveClassData } from '@/utils/indexedDB';
import { updateMoodleLinkDiff } from '@/utils/data-processing/updateDiff';
import { ClassData, Link } from '@/types/type';

type Status = 'cancellation' | 'inProgress' | 'completed' | 'failed';

export const toClassData = async (moodleLinkData: Link[], campasmateClassData: ClassData[]) => {

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
    if (classItem.credits === null) {
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

  updateMoodleLinkDiff(moodleLinkData, classData);
};

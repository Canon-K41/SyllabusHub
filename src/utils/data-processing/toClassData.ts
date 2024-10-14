import { callClassInfo } from '@/utils/callApi/callClassInfo';
import { ClassData } from '@/types/type';

function expandSubjectNames(input: string): string {
  const numerals: { [key: string]: string[] } = {
    'Ⅰ,Ⅱ': ['Ⅰ', 'Ⅱ'],
    'Ⅱ,Ⅲ': ['Ⅱ', 'Ⅲ'],
    // 必要に応じて他の組み合わせを追加
  };

  const match = input.match(/^(.+?)([Ⅰ-Ⅻ],[Ⅰ-Ⅻ])(?:\((.+)\))?$/);

  if (match) {
    const [, courseName, numeralPair, suffix] = match;
    const expandedNumerals = numerals[numeralPair] || numeralPair.split(',');

    return expandedNumerals
      .map(numeral => `${courseName}${numeral}${suffix ? `（${suffix}）` : ''}`)
      .join('、');
  }

  return input;
}

type Status = 'cancellation' | 'inProgress' | 'completed' | 'failed';

export const toClassData = async (): Promise<ClassData[]> => {
  const { moodleLinkData, campasmateClassData, homeworkData } = await callClassInfo();

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
      attendances: [],
      assignments: [],
    });
  });
  console.log(classData);

  classData.forEach(classItem => {
    for (const link of moodleLinkData) {
      const cleanTitle = expandSubjectNames(link.cleanTitle);
      if (cleanTitle.includes(classItem.courseName)) {
        classItem.url = link.url;
        classItem.dayOfWeek = link.weekOfDateParts;
      }else{
        classItem.url = null;
        classItem.dayOfWeek = [];
      }
      if(classItem.instructor === null){
        classItem.instructor = link.instructor;
      }
    }
  });
  console.log(classData);

  return classData;
};

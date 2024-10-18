import { CampasmateData, ClassData, Status } from '@/types/type';

export const toClassData = async ( campasmateClassData: CampasmateData[]) => {

  // campasmateClassDataが配列であることを保証
  const campasmateClassArray = Array.isArray(campasmateClassData) ? campasmateClassData : [campasmateClassData];

  const classData: ClassData[] = [];

  campasmateClassArray.forEach((classItem: CampasmateData) => {
    let status: Status = '単位修得済';
    if (classItem.grade === '?') {
      status = '履修中';
    } else if (classItem.grade === 'Ｆ') {
      status = '単位未修得';
    } else if (classItem.grade === 'Ｗ') {
      status = '履修取消';
    }
        

    classData.push({
      ...classItem,
      status,
      place: '', 
      description: '', 
      url: '', 
      dayOfWeek: [], 
      attendances: [],
      assignments: []
    });
  });

  return (classData);
};

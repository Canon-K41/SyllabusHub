import { addHomework } from '@/utils/data-processing/addHomework';
import { toClassData } from '@/utils/data-processing/toClassData';
import { callClassInfo } from '@/utils/callApi/callClassInfo';
import { callMoodleLink } from '@/utils/callApi/callMoodleLink';
import { callHomework } from '@/utils/callApi/callHomework';
import { getClassData } from '@/utils/indexedDB';

export const makeClassData = async () => {
  const moodleLinkData = await callMoodleLink();
  const campasmateClassData  = await callClassInfo();
  const homeworkData = await callHomework();
  const classData = await getClassData();
  await toClassData(moodleLinkData, campasmateClassData);
  console.log('finished making class data');
  await addHomework(homeworkData, classData);
  console.log('finished making homework data');
};

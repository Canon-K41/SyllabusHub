import { addHomework } from '@/utils/data-processing/addHomework';
import { toClassData } from '@/utils/data-processing/toClassData';

export const makeClassData = async () => {
  await toClassData();
  console.log('finished making class data');
  await addHomework();
  console.log('finished making homework data');
};

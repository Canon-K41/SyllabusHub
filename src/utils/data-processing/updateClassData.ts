import { toClassData } from '@/utils/data-processing/toClassData';
import { updateMoodleLinkDiff, updateHomeworkDiff, updateClassDataDiff } from '@/utils/data-processing/updateDiff';

export const updateClassData = async () => {
  try {
    console.log('Fetching and updating Campasmate class data...');
    const campasmateClassData = await updateClassDataDiff();

    console.log('Converting Campasmate class data to class data...');
    const classData = await toClassData(campasmateClassData);

    try {
      console.log('Updating class data with Moodle links...');
      const updatedClassDataWithMoodle = await updateMoodleLinkDiff(undefined, classData);

      try {
        console.log('Updating class data with homework...');
        const finalClassData = await updateHomeworkDiff(undefined, updatedClassDataWithMoodle);

        console.log('Finished making class data');
        return finalClassData;
      } catch (error) {
        console.error('Error occurred while updating homework:', error);
        return updatedClassDataWithMoodle;
      }
    } catch (error) {
      console.error('Error occurred while updating Moodle links:', error);
      return classData;
    }
  } catch (error) {
    console.error('Error occurred while making class data:', error);
    throw error;
  }
};

import { callClassInfo } from "@/utils/callApi/callClassInfo";
import { callHomework } from "@/utils/callApi/callHomework";
import { callMoodleLink } from "@/utils/callApi/callMoodleLink";
import { getClassData, saveClassData, saveClassPropaty } from "@/utils/indexedDB";
import { CampasmateData, ClassData, HomeworkItem, Link } from "@/types/type";
import { toClassData } from "@/utils/data-processing/toClassData";
import { addHomework } from "@/utils/data-processing/addHomework";

export async function updateMoodleLinkDiff(newMoodleLink?: Link[], oldClassData?: ClassData[]) {
  const newMoodleLinkData = newMoodleLink || await callMoodleLink();
  const oldClassDataList = oldClassData || await getClassData();
  const newClassData = oldClassDataList.map((classItem) => {
    newMoodleLinkData.forEach((moodleLink: Link) => {
      if (moodleLink.cleanTitles?.includes(classItem.courseName)) { 
        classItem.url = moodleLink.url;
        classItem.dayOfWeek = moodleLink.weekOfDateParts;
      }
    });
    return classItem;
  });
  if (newClassData.length > 0) {
    newClassData.forEach(async (classData: ClassData) => {
      await saveClassData(classData);
    });
  }
}

export async function updateClassDataDiff(newClassData?: CampasmateData[], oldClassData?: ClassData[]) {
  const newClassDataList = newClassData || await callClassInfo();
  const oldClassDataList = oldClassData || await getClassData();
  
  const diffClass = newClassDataList.filter((classData: CampasmateData) => {
    return !oldClassDataList.find((oldClassData: ClassData) => oldClassData.courseName === classData.courseName);
  });

  const existClass = newClassDataList.filter((classData: CampasmateData) => {
    return oldClassDataList.find((oldClassData: ClassData) => oldClassData.courseName === classData.courseName);
  });

  for (const classData of existClass) {
    const oldClass = oldClassDataList.find((oldClassData: ClassData) => oldClassData.courseName === classData.courseName);
    if (oldClass) {
      if (oldClass.grade !== classData.grade) {
        await saveClassPropaty(classData.courseName, 'grade', classData.grade);
      }
      if (oldClass.credits !== classData.credits) {
        await saveClassPropaty(classData.courseName, 'credits', classData.credits);
      }
      if (oldClass.instructor !== classData.instructor) {
        await saveClassPropaty(classData.courseName, 'instructor', classData.instructor);
      }
    }
  }

  if (diffClass.length > 0) {
    const newMoodleLink = await callMoodleLink();
    await toClassData(newMoodleLink, diffClass);
  }
}

export async function updateHomeworkDiff(newHomework?: HomeworkItem[], oldClassData?: ClassData[]) {
  const newHomeworkList = newHomework || await callHomework();
  const oldClassDataList = oldClassData || await getClassData();
  await addHomework(newHomeworkList, oldClassDataList);
}

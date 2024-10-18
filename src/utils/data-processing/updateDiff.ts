import { callClassInfo } from "@/utils/callApi/callClassInfo";
import { callHomework } from "@/utils/callApi/callHomework";
import { callMoodleLink } from "@/utils/callApi/callMoodleLink";
import { getClassData } from "@/utils/indexedDB";
import { CampasmateData, ClassData, HomeworkItem, Link, Assignment } from "@/types/type";
import { toClassData } from "@/utils/data-processing/toClassData";

export async function updateMoodleLinkDiff(newMoodleLinkList?: Link[], oldClassDataList?: ClassData[]) {
    const newMoodleLinkDataList = newMoodleLinkList || await callMoodleLink();
    const oldClassDataListFromDB = oldClassDataList || await getClassData();

    const newClassDataList = oldClassDataListFromDB.map((classItem) => {
        newMoodleLinkDataList.forEach((moodleLink: Link) => {
            if (moodleLink.cleanTitles?.includes(classItem.courseName)) { 
                classItem.url = moodleLink.url;
                classItem.dayOfWeek = moodleLink.weekOfDateParts;
            }
        });
        return classItem;
    });

    return newClassDataList;
}

export async function updateClassDataDiff(newClassDataList?: CampasmateData[], oldClassDataList?: ClassData[]) {
    const newCampasmateDataList = newClassDataList || await callClassInfo();
    const oldClassDataListFromDB = oldClassDataList || await getClassData() || [];
    
    const diffCampasemateDataList = newCampasmateDataList.filter((classData: CampasmateData) => {
        return !oldClassDataListFromDB.find((oldClassData: ClassData) => oldClassData.courseName === classData.courseName);
    });

    const existClassDataList = newCampasmateDataList.filter((classData: CampasmateData) => {
        return oldClassDataListFromDB.find((oldClassData: ClassData) => oldClassData.courseName === classData.courseName);
    });

    for (const classData of existClassDataList) {
        const oldClass = oldClassDataListFromDB.find((oldClassData: ClassData) => oldClassData.courseName === classData.courseName);
        if (oldClass) {
            if (oldClass.grade === '?') {
                oldClass.grade = classData.grade;
            }
            if (oldClass.credits === '?') {
                oldClass.credits = classData.credits;
            }
            if (oldClass.instructor === '?') {
                oldClass.instructor = classData.instructor
            }
        }
    }
    
    const diffClassDataList = await toClassData(diffCampasemateDataList);

    return [...diffClassDataList, ...existClassDataList];
}

function checkAssignmentExists(homeworkItem: { homeworkTitle: string }, classItem: { assignments: { name: string }[] }): boolean {
    return classItem.assignments.some(assignment => homeworkItem.homeworkTitle === assignment.name);
}

export async function updateHomeworkDiff(newHomeworkList?: HomeworkItem[], oldClassDataList?: ClassData[]) {
    const newHomeworkDataList = newHomeworkList || await callHomework();
    const oldClassDataListFromDB = oldClassDataList || await getClassData();

    if (!newHomeworkDataList || !oldClassDataListFromDB) {
        throw new Error('Data could not be retrieved. Please check your network connection and try again.');
    }

    oldClassDataListFromDB.forEach((classItem: ClassData) => {
        newHomeworkDataList.forEach((homeworkItem: HomeworkItem) => {
            let assignments: Assignment | null = null;
            if (!checkAssignmentExists(homeworkItem, classItem)) {
                assignments = {
                    name: homeworkItem.homeworkTitle,
                    dueDate: homeworkItem.deadline,
                    url: homeworkItem.href,
                    submittedDate: '',
                    status: 'unsubmitted',
                    score: 0,
                    maxScore: 100,
                };
            }
            if (homeworkItem.cleanTitles?.includes(classItem.courseName) && assignments) {
                classItem.assignments.push(assignments);
            }
        });
    });

    return oldClassDataListFromDB;
}

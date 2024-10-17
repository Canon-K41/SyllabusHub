import { HomeworkItem, ClassData, Assignment } from '@/types/type';
import { saveClassData } from '@/utils/indexedDB';

function checkAssignmentExists(homeworkItem: { homeworkTitle: string }, classItem: { assignments: { name: string }[] }): boolean {
    for (let assignment of classItem.assignments) {
        if (homeworkItem.homeworkTitle === assignment.name) {
            return true;
        }
    }
    return false;
}

export const addHomework = async (data: HomeworkItem[], classData: ClassData[]) => {
    if (!data || !classData) {
        throw new Error('Data could not be retrieved. Try again later.');
    }
    classData.forEach((classItem: ClassData) => {
        data.forEach((homeworkItem: HomeworkItem) => {
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
                saveClassData(classItem);
            }
        });
    });
}

import { getClassData } from '@/utils/indexedDB

const classTime = { '1': {'start': '08:40', 'end': '10:10'}, '2': {'start': '10:30', 'end': '12:00'}, '3': {'start': '13:00', 'end': '14:30'}, '4': {'start': '14:50', 'end': '16:20'}, '5': {'start': '16:40', 'end': '18:10'}, '6': {'start': '18:30', 'end': '20:00'}, '7': {'start': '20:20', 'end': '21:50'} };

const classCount = { '春学期': 8, '秋学期': 8, '夏学期': 8, '冬学期': 8 , 通年': 0, '前期': 15, '後期': 15 };
const makeCalendarevent = (classData) => {
if(classData.dayOfWeek) {
  const title = classData.courseName;
  const place = classData.place;
  const url = classData.url;
  const description = classData.description;
  const start = new Date();
  const end = new Date();
  const color = 'blue';
  const textColor = 'white';
  return { title, place, url, description, start, end, color, textColor };
} 
}

export const classDataToEventData = async () => {
  const classesData = await getClassData();
  const events = classesData.map((classData) => makeCalendarevent(classData));


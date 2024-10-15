'use client';
import React from 'react';
import { toClassData } from '@/utils/data-processing/toClassData';
import CourseEditor from '@/ui/myclass/CourseEditor';
import { ClassData } from '@/types/type';

export default function Page() {
  const test: ClassData = {
    courseName: "物理学I",
    credits: "3",
    grade: "C",
    year: "2023",
    term: "春学期",
    instructor: "佐藤 花子",
    date: "2023-04-01",
    description: "力学の基礎を学びます。",
    url: "https://example.com/physics1",
    dayOfWeek: ["月", "木"],
    status: "inProgress",
    attendances: [
      { date: "2023-04-03", status: "present" },
      { date: "2023-04-10", status: "late" },
    ],
    assignments: [
      { name: "課題1", dueDate: "2023-04-17", submittedDate: "2023-04-15", score: 85, maxScore: 100 },
      { name: "課題2", dueDate: "2023-05-01", submittedDate: null, score: null, maxScore: 100 },
    ],
  };

  return (
    <div>
      <h1 className='text-gray-700'>Welcome to the Home Page</h1>
      <button onClick={toClassData}>Get Class Info</button>
      <h1 className='right-0 text-gray-700'>Here is not youre home LogIn?</h1>
      <CourseEditor course={test} />
    </div>
  );
}

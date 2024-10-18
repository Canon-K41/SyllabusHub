'use client';

import React, { useState } from 'react';
import { updateClassData } from '@/utils/data-processing/updateClassData';
import { saveClassData } from '@/utils/indexedDB';
import HomeworkList from '@/ui/home/HomeworkList';
import StylishTimetable from '@/components/calendar/kari';
import { ClassData } from '@/types/type';

export default function Home() {
  async function saveClassDataToDB() {
    const updatedClassData = await updateClassData();
    updatedClassData.forEach((data) => {
      saveClassData(data);
    });
  }

  return (
    <div>
      <h1 className='text-gray-700'>Welcome to the Home Page</h1>
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={saveClassDataToDB}>
        Save Class Data
      </button>
      <StylishTimetable />
      <HomeworkList />
    </div>
  );
}

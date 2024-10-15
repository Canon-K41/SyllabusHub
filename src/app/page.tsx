'use client';

import HomeworkList from '@/ui/home/HomeworkList';
import React, { useMemo } from 'react';
import { makeClassData } from '@/utils/data-processing/makeClassData';

export default function Home() {
  useMemo(() => {makeClassData()}, []);
  return (
    <div>
      <h1 className='text-gray-700'>Welcome to the Home Page</h1>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={makeClassData} />
      <HomeworkList />
    </div>
  );
}

'use client';
import React from 'react';
import { toClassData } from '@/utils/data-processing/toClassData';

export default function Page() {
  return (
    <div>
      <h1 className='text-gray-700'>Welcome to the Home Page</h1>
      <button onClick={toClassData}>Get Class Info</button>
        <h1 className='right-0 text-gray-700'>Here is not youre home LogIn?</h1>
      </div>
  )
}

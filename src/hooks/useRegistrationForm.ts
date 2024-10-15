import { useState, useEffect } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { getUserInfo } from '@/utils/indexedDB';

export const useRegistrationForm = () => {
  const [formData, setFormData] = useState({
    moodleAccount: '',
    password: '',
    nickname: '',
    grade: '',
    faculty: '',
    course: '',
  });

  useEffect(() => {
    const fetchPassword = async () => {
      try {
        const userInfo = await getUserInfo();
        if (userInfo && Array.isArray(userInfo) && userInfo.length > 0) {
          setFormData((prevData) => ({
            ...prevData,
            moodleAccount: userInfo[0]?.moodleAccount || '',
            password: userInfo[0]?.password || '',
            nickname: userInfo[0]?.nickname || '',
            grade: userInfo[0]?.grade || '',
            faculty: userInfo[0]?.faculty || '',
            course: userInfo[0]?.course || '',
          }));
        } else {
          console.error('User info is null or not an array');
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchPassword();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return {
    formData,
    handleChange,
    handleSelectChange,
  };
};

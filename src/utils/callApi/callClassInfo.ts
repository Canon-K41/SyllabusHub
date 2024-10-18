import { UserInfo } from '@/types/type';
import { getUserInfo } from '@/utils/indexedDB';

export const callClassInfo = async () => {
  const userDetails: UserInfo | null = await getUserInfo();
  
  if (userDetails === null) {
    throw new Error('User information could not be retrieved.');
  }

  const accountName = userDetails.moodleAccount;
  const password = userDetails.password;

  const campasmateClassResponse = await fetch('/api/scrapeClasses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: accountName, password: password }),
  });
  console.log('finished scraping campasmate class');

  const campasmateClassJson = await campasmateClassResponse.json();
  const campasmateClassData = campasmateClassJson.classes; 
  
  return  campasmateClassData ;
}

import { UserInfo } from '@/types/type';
import { getUserInfo } from '@/utils/indexedDB';

export const callClassInfo = async () => {
  const userDetails: UserInfo | null = await getUserInfo();
  
  if (userDetails === null) {
    throw new Error('User information could not be retrieved.');
  }

  const accountName = userDetails.moodleAccount;
  const password = userDetails.password;

  const moodleLinkResponse = await fetch('/api/scrapeMoodleLink', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: accountName, password: password }),
  });
  console.log('finished scraping moodle link');

  const campasmateClassResponse = await fetch('/api/scrapeClasses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: accountName, password: password }),
  });
  console.log('finished scraping campasmate class');

  const moodleLinkData = (await moodleLinkResponse.json()).Links;
  const campasmateClassJson = await campasmateClassResponse.json();
  const campasmateClassData = campasmateClassJson.classes; // 正しいプロパティ名を使用
  
  console.log(moodleLinkData, campasmateClassData );
  return { moodleLinkData, campasmateClassData };
}

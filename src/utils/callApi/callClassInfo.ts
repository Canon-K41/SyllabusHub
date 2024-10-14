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
  const campasmateClassResponse = await fetch('/api/scrapeClasses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: accountName, password: password }),
  });
  const homeworkResponse = await fetch('/api/scrapeHomework', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: accountName, password: password }),
  });

  const moodleLinkData = (await moodleLinkResponse.json()).Links;
  const campasmateClassJson = await campasmateClassResponse.json();
  console.log(campasmateClassJson); // ここでレスポンスの構造を確認
  const campasmateClassData = campasmateClassJson.classes; // 正しいプロパティ名を使用
  const homeworkData = (await homeworkResponse.json()).homework;
  
  console.log(moodleLinkData, campasmateClassData, homeworkData);
  return { moodleLinkData, campasmateClassData, homeworkData };
}

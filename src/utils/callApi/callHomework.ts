import { getUserInfo } from '@/utils/indexedDB';
export const callHomework = async () => {
  const userDetails = await getUserInfo();
  if (userDetails === null) {
    throw new Error('User information could not be retrieved.');
  }
  const accountName = userDetails.moodleAccount;
  const password = userDetails.password;
  const moodleLinkResponse = await fetch('/api/scrapeHomework', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: accountName, password: password }),
  });
  console.log('finished scraping homework');
  const moodleHomeworkData = await moodleLinkResponse.json();
  const homeworkData = moodleHomeworkData.homework;
  return homeworkData;
}

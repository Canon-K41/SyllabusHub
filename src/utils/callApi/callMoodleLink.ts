import { UserInfo } from '@/types/type';
import { getUserInfo } from '@/utils/indexedDB';
 
export const callMoodleLink = async () => {
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

  const moodleLinkData = (await moodleLinkResponse.json()).Links;
  return moodleLinkData;
}

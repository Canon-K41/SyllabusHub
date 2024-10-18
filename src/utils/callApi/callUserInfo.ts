export const callUserInfo = async (username: string, password: string) => {
  const response = await fetch('/api/scrapeUserInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  console.log('finished scraping user info');

  if (!response.ok) {
    throw new Error('アカウント名もしくはパスワードが間違っています');
  }

  return response.json();
};

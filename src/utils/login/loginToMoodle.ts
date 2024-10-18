import { chromium } from 'playwright';

export async function loginToMoodle(username: string, password: string) {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    httpCredentials: {
      username: username,
      password: password
    }
  });
  const page = await context.newPage();

  try {
    await page.goto('https://moodle.s.kyushu-u.ac.jp/login/index.php', { waitUntil: 'networkidle', timeout: 60000 });

    // ユーザー名とパスワードを入力
    await page.fill('input[name="username"]', username, { timeout: 60000 });
    await page.fill('input[name="password"]', password, { timeout: 60000 });
    
    // ログインボタンをクリック
    await page.click('button[type="submit"]', { timeout: 60000 });

    // ログイン後のページを確認
    await page.waitForLoadState('networkidle', { timeout: 60000 });

    console.log('Logged in to Moodle');
    return { browser, page };
  } catch (error) {
    await browser.close();
    throw error;
  }
}


import { chromium } from 'playwright';

export async function loginToCampasmate(username: string, password: string) {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    httpCredentials: {
      username: username,
      password: password
    }
  });
  const page = await context.newPage();
  try {
    await page.goto('https://ku-portal.kyushu-u.ac.jp/campusweb/top.do', { waitUntil: 'networkidle', timeout: 60000 });
    await page.click('#loginButton', { timeout: 60000 });
    await page.waitForLoadState('networkidle', { timeout: 60000 });

    // ユーザー名とパスワードを入力
    await page.fill('input[name="j_username"]', username, { timeout: 60000 });
    await page.fill('input[name="j_password"]', password, { timeout: 60000 });
    console.log('ユーザー名とパスワードを入力しました。');
    
    // ログインボタンをクリック
    await page.click('input[type="submit"]', { timeout: 60000 });
    console.log('ログインボタンをクリックしました。');

    // ログイン後のページを確認
    await page.waitForLoadState('networkidle', { timeout: 60000 });
    console.log('ログイン後のページを確認しました。');
    
    return { browser, page };
  }catch (error) {
    await browser.close();
    throw error;
  }
}

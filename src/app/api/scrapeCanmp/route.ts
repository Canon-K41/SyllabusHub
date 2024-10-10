
import { chromium } from 'playwright';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  if (req.method !== 'GET') {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }

  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');
  const password = searchParams.get('password');

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
  }

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
    await page.click('input[id="loginButton"]', { timeout: 60000 });

    // ユーザー名とパスワードを入力
    await page.fill('input[name="username"]', username, { timeout: 60000 });
    await page.fill('input[name="password"]', password, { timeout: 60000 });
    
    // ログインボタンをクリック
    await page.click('button[type="submit"]', { timeout: 60000 });
    console.log('ログインボタンをクリックしました。');

    // ログイン後のページを確認
    await page.waitForLoadState('networkidle', { timeout: 60000 });
    console.log('ログイン後のページを確認しました。');

    const H1 = await page.$eval('h1', (el) => el.textContent);
    // 追加の操作を記述
    return NextResponse.json({ message: H1 });

  } catch (error) {
    console.error(`Error occurred: ${error}`);
    return NextResponse.json({ error: 'An error occurred while scraping the page' }, { status: 500 });
  } finally {
    await browser.close();
  }
}

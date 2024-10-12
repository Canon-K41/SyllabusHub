import { loginToMoodle } from '@/utils/loginToMoodle';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {

  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');
  const password = searchParams.get('password');

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
  }
  try {
    const { browser, page } = await loginToMoodle(username, password);
    console.log('ログイン成功');

    // 要素が存在するか確認
    await page.waitForSelector('a[href="https://moodle.s.kyushu-u.ac.jp/my/"]', { timeout: 60000 });
    console.log('要素が見つかりました');

    // 要素をクリック
    await page.click('a[href="https://moodle.s.kyushu-u.ac.jp/my/"]', { timeout: 60000 });
    console.log('クリックしました');

    // ページの読み込みを待つ
    await page.waitForLoadState('networkidle', { timeout: 60000 });
    console.log('ページを確認しました');

    // 宿題の内容を取得
    const Homework = await page.$eval('div[class="pb-2"]', (el) => el.innerHTML);
    if (!Homework) {
      throw new Error('Failed to get homework');
    }
    await browser.close();
    console.log(Homework);

    return new Response(Homework, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    console.error(`Error occurred: ${error}`);
    return NextResponse.json({ error: 'An error occurred while scraping the page' }, { status: 500 });
  }
}

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

    // コースのデータを取得
    const courses = await page.$$eval('.card.dashboard-card', (cards: Element[]) => {
      return Array.from(cards).map(card => {
        const courseNameElement = card.querySelector('.multiline span[aria-hidden="true"]');
        const courseUrlElement = card.querySelector('a');

        const courseName = courseNameElement ? courseNameElement.textContent.trim() : null;
        const courseUrl = courseUrlElement ? courseUrlElement.getAttribute('href') : null;

        return { courseName, courseUrl };
      });
    });

    await browser.close();

    return NextResponse.json(courses);
  } catch (error) {
    console.error(`Error occurred: ${error}`);
    return NextResponse.json({ error: 'An error occurred while scraping the page' }, { status: 500 });
  }
}

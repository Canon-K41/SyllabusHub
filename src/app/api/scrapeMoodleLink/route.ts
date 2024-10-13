import { loginToMoodle } from '@/utils/loginToMoodle';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }

  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
  }
  try {
    const { browser, page } = await loginToMoodle(username, password);
    console.log('ログイン成功');
    await page.click('a[href="https://moodle.s.kyushu-u.ac.jp/my/courses.php"]');
    await page.waitForLoadState('networkidle', { timeout: 60000 });
    console.log('ページを確認しました');

    const Links = await page.$$eval('div.dashboard-card', links => {
      return links.map(link => {
        const title = link.querySelector('span.sr-only')?.textContent?.trim() || null;
        const url = link.querySelector('a')?.href || null;
        return { title, url };
      });
    }
    );
    await browser.close();
    return NextResponse.json({ Links });
  } catch (error) {
    console.error(`Error occurred: ${error}`);
    return NextResponse.json({ error: 'An error occurred while scraping the page' }, { status: 500 });
  }
}

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
    const homeworkList = await page.$$eval('div[class="list-group list-group-flush"]', rows => {
      return rows.map(row => {
        const links = row.querySelectorAll('a[title]');
        return Array.from(links).map(link => {
          const anchor = link as HTMLAnchorElement;
          return {
            text: anchor.textContent?.trim() || '',
            href: anchor.href || '',
            label: anchor.getAttribute('aria-label') || ''
          };
        });
      }).flat();
    });

    if (!homeworkList || homeworkList.length === 0) {
      throw new Error('Failed to get homework');
    }

    await browser.close();
    return NextResponse.json({ homework: homeworkList }, { status: 200 });
  } catch (error) {
    console.error(`Error occurred: ${error}`);
    return NextResponse.json({ error: 'An error occurred while scraping the page' }, { status: 500 });
  }
}

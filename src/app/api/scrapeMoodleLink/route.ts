import { loginToMoodle } from '@/utils/login/loginToMoodle';
import { NextRequest, NextResponse } from 'next/server';

interface Link {
  year: string | null;
  term: string | null;
  weekOfDate: string | null;
  weekOfDateParts: string[];
  cleanTitle: string | null;
  instructor: string | null;
  url: string | null;
}

async function scrapeLinks(page: any): Promise<Link[]> {
  return await page.$$eval('div.dashboard-card', (links: Element[]) => {
    return links.map(link => {
      const textContent = link.querySelector('span.sr-only')?.textContent?.trim() || null;
      const year = textContent?.split('・')[0].split('年度')[0];
      const term = textContent?.split('・')[0].split('年度')[1];
      const weekOfDate = textContent?.split('・')[1];
      const title = textContent?.split('・')[2];
      const url = link.querySelector('a')?.href || null;
      if (!term || !weekOfDate || !title || !url) {
        return null;
      }

      const weekOfDateParts = weekOfDate.match(/([月火水木金土日](?:\(\d+,\d+\)|\d+))/g) || [];
      const instructorMatch = title.match(/（([^）]+)）$/);
      const instructor = instructorMatch ? instructorMatch[1] : null;
      const cleanTitle = title.replace(/（([^）]+)）$/, '');

      return { year, term, weekOfDateParts, cleanTitle, instructor, url };
    });
  });
}

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

    try {
      await page.click('a[href="https://moodle.s.kyushu-u.ac.jp/my/courses.php"]');
      await page.waitForLoadState('networkidle', { timeout: 60000 });
      console.log('ページを確認しました');
    } catch (pageError) {
      console.error(`ページ操作エラー: ${pageError}`);
      await browser.close();
      return NextResponse.json({ error: 'Failed to navigate the page' }, { status: 500 });
    }

    const Links = await scrapeLinks(page);
    const filteredLink = Links.filter(link => link !== null);
    await browser.close();
    return NextResponse.json({ ...filteredLink });
  } catch (error) {
    console.error(`Error occurred: ${error}`);
    return NextResponse.json({ error: 'An error occurred while scraping the page' }, { status: 500 });
  }
}

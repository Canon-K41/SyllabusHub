import { loginToMoodle } from '@/utils/login/loginToMoodle';
import { Page } from 'playwright';
import { NextRequest, NextResponse } from 'next/server';

interface Link {
  year: string | null;
  term: string | null;
  weekOfDateParts: string[];
  cleanTitle: string | null;
  instructor: string | null;
  url: string | null;
}

async function scrapeLinks(page: Page): Promise<Link[]> {
  const links = await page.$$eval('div.dashboard-card', (links: Element[]) => {
    return links.map(link => {
      const textContent = link.querySelector('span.sr-only')?.textContent?.trim() || null;
      const year = textContent?.split('・')[0].split('年度')[0] || null;
      const term = textContent?.split('・')[0].split('年度')[1] || null;
      const weekOfDate = textContent?.split('・')[1] || null;
      const title = textContent?.split('・')[2] || null;
      const url = link.querySelector('a')?.href || null;
      const instructorMatch = title?.match(/（([^）]+)）$/) || null;
      const instructor = instructorMatch ? instructorMatch[1] : null;

      if (!term || !weekOfDate || !title || !url || !year || !instructor) {
        return null;
      }
      const weekOfDateParts = weekOfDate.match(/([月火水木金土日](?:\(\d+,\d+\)|\d+))/g) || [];
      const cleanTitle = title.replace(/（([^）]+)）$/, '');

      return { year, term,  weekOfDateParts, cleanTitle, instructor, url };
    }).filter(link => link !== null) as Link[];
  });

  return links;
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
    await browser.close();
    return NextResponse.json({ Links });
  } catch (error) {
    console.error(`Error occurred: ${error}`);
    return NextResponse.json({ error: 'An error occurred while scraping the page' }, { status: 500 });
  }
}

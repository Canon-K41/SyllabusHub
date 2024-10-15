import { loginToMoodle } from '@/utils/login/loginToMoodle';
import { Page } from 'playwright';
import { NextRequest, NextResponse } from 'next/server';
import { Link } from '@/types/type';

async function scrapeLinks(page: Page): Promise<Link[]> {
  const links = await page.$$eval('div.dashboard-card', (links: Element[]) => {
    function removeNestedParentheses(input: string): string {
      let result = input;
      while (true) {
        const newResult = result.replace(/（[^（）]*）/g, '');
        if (newResult === result) {
          break;
        }
        result = newResult;
      }
      return result.replace(/\s+/g, ' ').trim();
    }
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
      const cleanTitle = removeNestedParentheses(title);
      const cleanTitles = cleanTitle.split(/[,，]/);
      cleanTitles.forEach((cleanTitle, index) => {
        if (cleanTitle.length === 1) {
          cleanTitles[index] = cleanTitles[index - 1].slice(0, -1) + cleanTitles[index];
        }
      });
      return { year, term, weekOfDateParts, cleanTitles, instructor, url };
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

    try {
      await page.click('a[href="https://moodle.s.kyushu-u.ac.jp/my/courses.php"]');
      await page.waitForLoadState('networkidle', { timeout: 60000 });
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

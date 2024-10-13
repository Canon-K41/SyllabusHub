import { loginToCampasmate } from '@/utils/login/loginToCampasmate';
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
    const { page, browser } = await loginToCampasmate(username, password);
    await page.hover('a[href="tab.do?buttonName=changeTab&menulv1=0000000004"]');

    // 成績照会のリンクが表示されるまで待機
    await page.waitForSelector('a[title="成績照会"]', { timeout: 60000 });

    await page.click('a[title="成績照会"]');
    await page.waitForLoadState('networkidle', { timeout: 60000 });
    console.log('gradeページを確認しました');

    // 複数の要素を取得
    const classes = await page.$$eval('tr.column_odd', rows => {
      return rows.map(row => {
        const cells = row.querySelectorAll('td');
        return {
          courseName: cells[0].textContent?.trim() || null,
          credits: cells[1].textContent?.trim() || null,
          grade: cells[2].textContent?.trim() || null,
          year: cells[4].textContent?.trim() || null,
          term: cells[5].textContent?.trim() || null,
          courseCode: cells[6].textContent?.trim() || null,
          studentId: cells[7].textContent?.trim() || null,
          instructor: cells[8].textContent?.trim() || null,
          date: cells[9].textContent?.trim() || null,
        };
      });
    });

    await browser.close();
    return NextResponse.json({ classes });
  } catch (error) {
    console.error(`Error occurred: ${error}`);
    return NextResponse.json({ error: 'An error occurred while scraping the page' }, { status: 500 });
  }
}

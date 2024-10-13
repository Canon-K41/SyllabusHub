import { loginToCampasmate } from '@/utils/loginToCampasmate';
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
    const userName = await page.$eval('ul.user > li.item:nth-child(3)', el => el.textContent?.trim() || null);
    const studentId = await page.$eval('//*[@id="login_inf"]/div[2]/ul[2]/li[2]', el => el.textContent?.trim() || null);

    const userInfo = {
      userName: userName,
      studentId: studentId,
    };

    await browser.close();
    return NextResponse.json({ userInfo });
  }
  catch (error) {
    console.error(`Error occurred: ${error}`);
    return NextResponse.json({ error: 'An error occurred while scraping the page' }, { status: 500 });
  }
}

     

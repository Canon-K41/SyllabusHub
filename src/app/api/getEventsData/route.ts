import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function GET(req: NextRequest) {
  const { data, error } = await supabase
    .from('events')
    .select('*')

    console.log(data)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }else if (data === null) {
    console.log('No data found')
  }


  return NextResponse.json(data, { status: 200 })
}

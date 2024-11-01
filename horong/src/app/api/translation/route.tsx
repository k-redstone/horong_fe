import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { text, lang }: { text: string; lang: 'KO' | 'JA' | 'ZH' | 'EN' } =
    await request.json()

  const params = {
    auth_key: process.env.DEEPL_API_KEY,
    text: text,
    target_lang: lang,
  }

  try {
    const response = await axios.post(
      'https://api.deepl.com/v2/translate',
      null,
      {
        params,
      },
    )
    console.log(response.data.translations[0].text)
    return NextResponse.json(
      {
        message: 'Translate Success.',
        result: response.data.translations[0].text,
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    )
  }
}

import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const {
    text,
    lang,
    type,
  }: { text: string; lang: 'KO' | 'JA' | 'ZH' | 'EN'; type: 'html' | 'str' } =
    await request.json()

  let params
  if (type === 'html') {
    params = {
      auth_key: process.env.DEEPL_API_KEY,

      text: text,
      target_lang: lang,
      tag_handling: 'html',
    }
  } else {
    params = {
      auth_key: process.env.DEEPL_API_KEY,
      text: text,
      target_lang: lang,
    }
  }

  try {
    const response = await axios.post(
      'https://api.deepl.com/v2/translate',
      null,
      {
        params,
      },
    )
    console.log(response.data)
    console.log(response.data.translations[0].text)
    return NextResponse.json(
      {
        message: 'Translate Success.',
        result: {
          text: response.data.translations[0].text,
          detected_source_language:
            response.data.translations[0].detected_source_language,
        },
        // result: response.data.translations.map((t) => t.text),
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

import axios from 'axios'

import { ContentItem } from '@/features/community/types/post/index.ts'
type InputItem = {
  text: string
  originLang: string
  lang: string
}

async function transHTML(htmlString: string) {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = htmlString

  const targetLanguages = ['EN', 'KO', 'JA', 'ZH']
  const translationPromises = targetLanguages.map(async (lang) => {
    const payload = {
      text: htmlString,
      lang: lang,
      type: 'html',
    }
    const translatedData = await axios.post('/api/translation', payload)
    return {
      text: translatedData.data.result.text,
      originLang: translatedData.data.result.detected_source_language,
      lang: lang,
    }
  })

  const translations = await Promise.all(translationPromises)
  return translations
}

async function transText(htmlString: string) {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = htmlString

  const targetLanguages = ['EN', 'KO', 'JA', 'ZH']
  const translationPromises = targetLanguages.map(async (lang) => {
    const payload = {
      text: htmlString,
      lang: lang,
      type: 'str',
    }
    const translatedData = await axios.post('/api/translation', payload)
    return {
      text: translatedData.data.result.text,
      originLang: translatedData.data.result.detected_source_language,
      lang: lang,
    }
  })

  const translations = await Promise.all(translationPromises)
  return translations
}

function transContentToPostPayload(
  contentList: InputItem[],
  titleList: InputItem[],
): ContentItem[] {
  return contentList.map((item, index) => ({
    title: titleList[index]?.text || '기본 타이틀입니다.', // list2의 text를 title로 설정
    content: item.text, // list1의 text를 content로 설정
    isOriginal: item.originLang === item.lang,
    language: transLanguageType(item.lang.toUpperCase()), // 언어 코드를 대문자로 변환
  }))
}

function transLanguageType(lang: string) {
  switch (lang) {
    case 'KO':
      return 'KOREAN'
    case 'EN':
      return 'ENGLISH'
    case 'JA':
      return 'JAPANESE'
    case 'ZH':
      return 'CHINESE'
    default:
      return 'ENGLISH'
  }
}
export { transHTML, transText, transContentToPostPayload }

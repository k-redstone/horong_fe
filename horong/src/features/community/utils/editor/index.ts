import axios from 'axios'

import { COMMUNITY_CONSTANT } from '@/constants/community/index.ts'
import {
  BoardType,
  ContentItem,
} from '@/features/community/types/post/index.ts'
import { CommunityPathType } from '@/features/community/utils/path/index.ts'
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
    isOriginal: false,
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

function transPathtoHeader(lang: string, boardType: CommunityPathType) {
  switch (boardType) {
    case 'notice':
      return COMMUNITY_CONSTANT[lang]['notice-header']
    case 'free':
      return COMMUNITY_CONSTANT[lang]['free-header']
    case 'seoul':
      return COMMUNITY_CONSTANT[lang]['region-subheader-seoul']
    case 'gyeonggi':
      return COMMUNITY_CONSTANT[lang]['region-subheader-gyeonggi']
    case 'incheon':
      return COMMUNITY_CONSTANT[lang]['region-subheader-gyeonggi']
    case 'busan':
      return COMMUNITY_CONSTANT[lang]['region-subheader-busan']
  }
}

function transPathtoPayloadBoardType(boardType: CommunityPathType): BoardType {
  switch (boardType) {
    case 'notice':
      return 'NOTICE'
    case 'free':
      return 'FREE'
    case 'seoul':
      return 'SEOUL'
    case 'gyeonggi':
      return 'GYEONGGI'
    default:
      return 'FREE'
  }
}

function transDateFormat(date: string): string {
  const postDateTime = new Date(date)
  const now = new Date()

  // 오늘 날짜인지 확인
  const isToday =
    postDateTime.getDate() === now.getDate() &&
    postDateTime.getMonth() === now.getMonth() &&
    postDateTime.getFullYear() === now.getFullYear()

  if (isToday) {
    const hours = postDateTime.getHours().toString().padStart(2, '0')
    const minutes = postDateTime.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  } else {
    const month = (postDateTime.getMonth() + 1).toString().padStart(2, '0')
    const day = postDateTime.getDate().toString().padStart(2, '0')
    return `${month}/${day}`
  }
}

// ('CHUNGBUG','CHUNGNAM','FREE','GANGWON','GYEONGBUK','GYEONGGI','GYEONGNAM','JEJU','JEONBUK','JEONNAM','NOTICE','SEOUL')
export {
  transHTML,
  transText,
  transContentToPostPayload,
  transPathtoHeader,
  transDateFormat,
  transPathtoPayloadBoardType,
}

function isPostNew(receivedTimeStr: string): boolean {
  const receivedTime = new Date(receivedTimeStr)
  const currentTime = new Date()

  // 시간 차이를 밀리초로 계산
  const timeDifference = currentTime.getTime() - receivedTime.getTime()

  // 시간 차이가 1시간(3600000밀리초) 이내인지 확인
  return timeDifference >= 0 && timeDifference <= 3600000
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

function transFullDate(receivedTimeStr: string): string {
  const date = new Date(receivedTimeStr)
  const transDate = `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`
  return transDate
}

function transFullDateTime(receivedTimeStr: string): string {
  const date = new Date(receivedTimeStr)
  const transDate = `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  return transDate
}

export { isPostNew, transDateFormat, transFullDate, transFullDateTime }

import { setTokenHandler } from '@/util/firebase.ts'

async function handlePermissionRequest() {
  try {
    const permission: NotificationPermission =
      await Notification.requestPermission()

    if (permission !== 'granted') {
      alert('푸시 알림 거부됨')
    } else {
      // 푸시 알림이 승인되었을 때 토큰 핸들러 실행
      try {
        await setTokenHandler()
        alert('푸시 알림 승인됨')
      } catch (error) {
        console.error('토큰 저장 중 오류가 발생했습니다.', error)
        alert('푸시 알림 저장 중 오류가 발생했습니다. 다시 시도해주세요.')
      }
    }
  } catch (error) {
    console.error('푸시 알림 요청 중 오류가 발생했습니다.', error)
    alert('푸시 알림 요청 중 오류가 발생했습니다.')
  }
}

export { handlePermissionRequest }

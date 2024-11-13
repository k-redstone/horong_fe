import { NextRequest, NextResponse } from 'next/server'

import admin from '@/util/fcmAdmin.ts'

export async function POST(request: NextRequest) {
  const {
    title,
    body,
    userId,
  }: { title: string; body: string; userId: number } = await request.json()
  try {
    // 특정 userId에 해당하는 사용자 토큰 가져오기
    const snapshot = await admin
      .firestore()
      .collection('users')
      .where('userId', '==', userId)
      .get()

    if (snapshot.empty) {
      return NextResponse.json(
        { message: `No user found with userId: ${userId}` },
        { status: 404 },
      )
    }

    const userData = snapshot.docs[0].data()
    const token = userData.fcmToken

    if (!token) {
      return NextResponse.json(
        { message: `No FCM token found for userId: ${userId}` },
        { status: 404 },
      )
    }

    // FCM 메시지 구성
    const message = {
      notification: {
        title,
        body,
      },
      token,
    }
    await admin.messaging().send(message)

    return NextResponse.json(
      { message: 'Notification sent successfully' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error sending notification:', error)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    )
  }
}

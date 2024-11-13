import { NextRequest, NextResponse } from 'next/server'

import admin from '@/util/fcmAdmin.ts'

export async function POST(request: NextRequest) {
  const { token, userId }: { token: string; userId: number } =
    await request.json()

  try {
    await admin.firestore().collection('users').doc(`${userId}`).set(
      {
        fcmToken: token,
        userId: userId,
      },
      { merge: true },
    )

    return NextResponse.json(
      { message: 'Token saved successfully.' },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    )
  }
}

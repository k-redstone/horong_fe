import { NextRequest, NextResponse } from 'next/server'

import admin from '@/util/fcmAdmin.ts'

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId')

  if (!userId) {
    return NextResponse.json(
      { message: 'User ID is required.', result: false },
      { status: 400 },
    )
  }

  try {
    const userDoc = await admin
      .firestore()
      .collection('users')
      .doc(`${userId}`)
      .get()

    if (!userDoc.exists) {
      return NextResponse.json(
        { message: 'specified user does not exist.', result: false },
        { status: 200 },
      )
    }

    const userData = userDoc.data()

    if (userData && userData.fcmToken) {
      return NextResponse.json(
        { message: 'FCM token exists.', result: true },
        { status: 200 },
      )
    } else {
      return NextResponse.json(
        { message: 'FCM token does not exist.', result: false },
        { status: 404 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message, result: false },
      { status: 500 },
    )
  }
}

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

export async function DELETE(request: NextRequest) {
  const { userId }: { userId: number } = await request.json()

  try {
    await admin.firestore().collection('users').doc(`${userId}`).delete()

    return NextResponse.json(
      { message: 'Token deleted successfully.' },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    )
  }
}

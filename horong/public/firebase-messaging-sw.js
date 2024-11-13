importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-app-compat.js')
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging-compat.js',
)

firebase.initializeApp({
  apiKey: 'AIzaSyAhnHr_D6SJ6e2-H5gxRJ4Bpn8dpll2AjU',
  authDomain: 'horong-pwa.firebaseapp.com',
  projectId: 'horong-pwa',
  storageBucket: 'horong-pwa.firebasestorage.app',
  messagingSenderId: '994753549602',
  appId: '1:994753549602:web:7f3c708f812e1110ce417b',
  measurementId: 'G-K1PL5SF9D1',
})

const messaging = firebase.messaging()

// background
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload)

  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

// foreground
messaging.onMessage((payload) => {
  console.log('Message received in foreground:', payload)
  alert(`New Message: ${payload.notification.title}`)
})

// 클릭시
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event.notification)
  event.notification.close()

  event.waitUntil(clients.openWindow('https://pwa-study-xi.vercel.app/fcm'))
})

self.addEventListener('push', function (event) {
  if (event.data) {
    // 알림 메세지일 경우엔 event.data.json().notification;
    const data = event.data.json().notification
    const notificationTitle = data.title
    const notificationOptions = {
      body: data.body,
    }
    console.log(notificationTitle)
    event.waitUntil(
      self.registration.showNotification(
        notificationTitle,
        notificationOptions,
      ),
    )
  } else {
    console.log('This push event has no data.')
  }
})

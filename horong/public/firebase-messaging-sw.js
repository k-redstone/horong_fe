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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const messaging = firebase.messaging()

// background
// messaging.onBackgroundMessage((payload) => {
//   console.log('Received background message:', payload)

//   const notificationTitle = payload.notification.title
//   const notificationOptions = {
//     body: payload.notification.body,
//   }

//   self.registration.showNotification(notificationTitle, notificationOptions)
// })

// foreground
// messaging.onMessage((payload) => {
//   console.log('Message received in foreground:', payload)
//   alert(`New Message: ${payload.notification.title}`)
// })

// 클릭시
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const urlToOpen = new URL(event.notification.data.url)

  event.waitUntil(
    clients // 서비스 워커에서 현재 제어하는 클라이언트 목록
      .matchAll({
        type: 'window',
        includeUncontrolled: true, // 제어하고 있지 않은 클라이언트까지 포함 (백그라운드)
      })
      .then((windowClients) => {
        let foundWindowClient = null
        // 이미 열려 있는 창에서 서비스와 관련된 URL을 찾기 위한 로직 추가
        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i]

          if (
            new URL(client.url).hostname.includes('docent') &&
            'focus' in client
          ) {
            foundWindowClient = client
            break
          }
        }

        // 만약 백그라운드에 해당 서비스가 있다면
        if (foundWindowClient) {
          // 해당 탭을 focus하여 이동시킴
          return foundWindowClient.focus().then((focusedClient) => {
            if ('navigate' in focusedClient) {
              // 원하는 주소로 이동
              focusedClient.postMessage(urlToOpen.href)
            }
          })

          // 그게 아니라면 새창을 열어서 원하는 URL로 이동시킴
        } else if (clients.openWindow) {
          return clients.openWindow(urlToOpen.href)
        }
      }),
  )
})

self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json().data
    const notificationTitle = data.title
    const notificationOptions = {
      body: data.body,
      data: { url: data.url },
    }
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

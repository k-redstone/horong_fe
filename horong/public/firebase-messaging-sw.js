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
    clients
      .matchAll({
        type: 'window',
        includeUncontrolled: true,
      })
      .then((windowClients) => {
        // 이미 열려있는 창 찾기
        const matchingClient = windowClients.find(
          (client) => new URL(client.url).pathname === urlToOpen.pathname,
        )

        if (matchingClient) {
          return matchingClient.focus()
        } else {
          return clients.openWindow(urlToOpen.href)
        }
      })
      .then((client) => {
        if (client) {
          client.postMessage({ type: 'NAVIGATE', url: urlToOpen.href })
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

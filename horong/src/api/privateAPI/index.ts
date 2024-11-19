import axios from 'axios'

const privateAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})

privateAPI.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem('token')
  config.headers.Authorization = `Bearer ${accessToken}`

  return config
})

privateAPI.interceptors.response.use(
  (response) => {
    return response
  },
  // acceeToken이 만료되었을 때 refresh token을 이용해 accessToken을 재발급
  async (error) => {
    // const originalRequest = error.config
    // const statusCode = error.response?.status
    // if (statusCode === 401) {
    // 401일 경우 처리

    // return res
    // }

    return Promise.reject(error)
  },
)

export default privateAPI

import privateAPI from '@/api/privateAPI/index.ts'

async function uploadS3AnddInsertEmbed(file: File) {
  const formData = new FormData()
  formData.append('image', file)
  const res = await privateAPI.post('/community/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return res.data.result
}

export { uploadS3AnddInsertEmbed }

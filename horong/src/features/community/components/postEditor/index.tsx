'use client'

import QuillImageDropAndPaste from 'quill-image-drop-and-paste'
import { useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import ReactQuill, { Quill } from 'react-quill-new'

import { uploadS3AnddInsertEmbed } from '@/features/community/apis/editor/index.ts'
import './editor.css'
import 'react-quill-new/dist/quill.snow.css'
import EditorToolBar from '@/features/community/components/postEditor/EditorToolBar.tsx'
interface PostEditorProps {
  title: string
  imgList: string[]
  content?: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  setImgList: React.Dispatch<React.SetStateAction<string[]>>
  setContent: React.Dispatch<React.SetStateAction<string>>
}

Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste)

function PostEditor(props: PostEditorProps) {
  const { title, imgList, content, setImgList, setTitle, setContent } = props
  // const [content, setContent] = useState<string>('')
  // const [title, setTitle] = useState<string>('')
  const [previousContent, setPreviousContent] = useState('')
  // const [imgList, setImgList] = useState<string[]>([])
  const quillRef = useRef<ReactQuill>(null)

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value

    if (newValue.length >= 41) {
      return toast.error('최대 40자까지 입력 가능합니다.')
    }
    setTitle(newValue)
  }
  console.log('asdfasdfasdfasdf', content, imgList)
  const handleContentChange = (newContent: string) => {
    const prevImgUrls = Array.from(
      new DOMParser().parseFromString(previousContent, 'text/html').images,
    ).map((img) => img.src)
    const newImgUrls = Array.from(
      new DOMParser().parseFromString(newContent, 'text/html').images,
    ).map((img) => img.src)

    // 이전 내용에 있던 이미지 URL 중 새 내용에 없는 것들을 찾아 삭제
    const deletedImages = prevImgUrls.filter((url) => !newImgUrls.includes(url))

    if (deletedImages.length > 0) {
      setImgList((prevList) =>
        prevList.filter((url) => !deletedImages.includes(url)),
      )
      console.log('Images deleted:', deletedImages) // 확인을 위해 삭제된 이미지 URL 로그
    }

    setContent(newContent)
    setPreviousContent(newContent)
  }

  const imageHandler = async () => {
    if (!quillRef.current) {
      return
    }
    const editor = quillRef.current.getEditorContents()
    const imgTags = Array.from(
      new DOMParser().parseFromString(JSON.stringify(editor), 'text/html')
        .images,
    )

    if (imgTags.length >= 5) {
      return toast.error('이미지는 최대 5장 업로드 가능합니다.')
    }
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    console.log('asdf')

    input.addEventListener('change', async () => {
      console.log(imgList)
      if (!quillRef.current) {
        return
      }
      if (imgList.length >= 5) {
        return toast.error('이미지는 최대 5장 업로드 가능합니다.')
      }

      const file = input.files?.[0]
      if (file === undefined) {
        return
      }
      try {
        // const res = await imageApi({ img: file });
        // const imgURL =
        //   'https://cf-templates-1gyolugg9zn9q-ap-northeast-2.s3.ap-northeast-2.amazonaws.com/store/ee0e7809%2C5846%2C4b2c%2Cb9f2%2C81148b282892'
        const imgURL = await uploadS3AnddInsertEmbed(file)
        const editor = quillRef.current.getEditor()
        console.log(editor.getText())
        setImgList((prevList) => [
          ...prevList,
          `https://horong-service.s3.ap-northeast-2.amazonaws.com/${imgURL}`,
        ])
        const range = editor.getSelection()
        console.log(range)
        editor.insertEmbed(
          range ? range.index : 0,
          'image',
          `https://horong-service.s3.ap-northeast-2.amazonaws.com/${imgURL}`,
        )
        editor.setSelection(range ? range.index + 1 : 1)
      } catch (error) {
        console.log(error)
      }
    })
  }

  const handleDropAndPaste = async (
    dataUrl: string,
    type: string | string[],
  ) => {
    console.log('drag')
    if (!quillRef.current) {
      return
    }
    const editor = quillRef.current?.getEditorContents()
    const imgTags = Array.from(
      new DOMParser().parseFromString(JSON.stringify(editor), 'text/html')
        .images,
    )

    if (imgTags.length >= 5) {
      return toast.error('이미지는 최대 5장 업로드 가능합니다.')
    }

    if (type.includes('image')) {
      try {
        // const imgURL =
        //   'https://cf-templates-1gyolugg9zn9q-ap-northeast-2.s3.ap-northeast-2.amazonaws.com/store/ee0e7809%2C5846%2C4b2c%2Cb9f2%2C81148b282892'
        const blob = await fetch(dataUrl).then((res) => res.blob())
        const file = new File([blob], 'image.png', { type: 'image/png' })
        console.log(file)
        const imgURL = await uploadS3AnddInsertEmbed(file)
        const editor = quillRef.current.getEditor()
        const range = editor.getSelection()
        console.log(imgURL)
        console.log(imgList)
        setImgList((prevList) => [
          ...prevList,
          `https://horong-service.s3.ap-northeast-2.amazonaws.com/${imgURL}`,
        ])
        console.log(imgURL)
        console.log(range)
        editor.insertEmbed(
          range ? range.index : 0,
          'image',
          `https://horong-service.s3.ap-northeast-2.amazonaws.com/${imgURL}`,
        )
        editor.setSelection(range ? range.index + 1 : 1)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: '#editorToolBar',
        handlers: { image: imageHandler },
      },
      imageDropAndPaste: { handler: handleDropAndPaste },
      clipboard: {
        matchVisual: false,
      },
    }),
    [],
  )

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'align',
    'image',
  ]

  return (
    <div className="flex flex-col gap-y-4">
      <div className="gapx-2 flex w-full">
        <textarea
          className="grow resize-none bg-grey-80 text-lg focus:outline-none"
          onChange={(e) => handleTitleChange(e)}
          placeholder="제목을 입력하세요."
          value={title}
        />
        <div className="flex items-end">
          <span>{title.length}/40</span>
        </div>
      </div>
      <div
        id="editorToolBar"
        className="bg-white"
      >
        <EditorToolBar />
      </div>
      <ReactQuill
        ref={quillRef}
        onChange={(value) => handleContentChange(value)}
        modules={modules}
        formats={formats}
        placeholder={'내용을 입력하세요'}
        value={content}
        theme="snow"
      />
    </div>
  )
}

export default PostEditor

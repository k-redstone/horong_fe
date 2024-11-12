'use client'

import dompurify from 'dompurify'
import QuillImageDropAndPaste from 'quill-image-drop-and-paste'
import { useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import ReactQuill, { Quill } from 'react-quill-new'

import { COMMUNITY_CONSTANT } from '@/constants/community/index.ts'
import { uploadS3AnddInsertEmbed } from '@/features/community/apis/editor/index.ts'
import './editor.css'
import 'react-quill-new/dist/quill.snow.css'
import EditorToolBar from '@/features/community/components/postEditor/EditorToolBar.tsx'
import useLangStore from '@/hooks/useLangStore.ts'
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
  const lang = useLangStore((state) => state.lang)
  const sanitizer = dompurify.sanitize
  const { title, imgList, content, setImgList, setTitle, setContent } = props
  const [previousContent, setPreviousContent] = useState('')

  const quillRef = useRef<ReactQuill>(null)

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value

    if (newValue.length >= 41) {
      return toast.error(COMMUNITY_CONSTANT[lang]['post-limit-title-text'])
    }
    setTitle(newValue)
  }

  const handleContentChange = (newContent: string) => {
    if (newContent.length >= 4001) {
      setContent('')
      const editor = quillRef.current?.getEditor()
      editor?.clipboard.dangerouslyPasteHTML(sanitizer(`${content}`))
      toast.error(COMMUNITY_CONSTANT[lang]['post-limit-content-text'])
      return
    }

    const prevImgUrls = Array.from(
      new DOMParser().parseFromString(previousContent, 'text/html').images,
    ).map((img) => img.src)
    const newImgUrls = Array.from(
      new DOMParser().parseFromString(newContent, 'text/html').images,
    ).map((img) => img.src)

    const deletedImages = prevImgUrls.filter((url) => !newImgUrls.includes(url))

    if (deletedImages.length > 0) {
      setImgList((prevList) =>
        prevList.filter((url) => !deletedImages.includes(url)),
      )
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
      return toast.error(COMMUNITY_CONSTANT[lang]['post-limit-img-text'])
    }
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.addEventListener('change', async () => {
      if (!quillRef.current) {
        return
      }
      if (imgList.length >= 5) {
        return toast.error(COMMUNITY_CONSTANT[lang]['post-limit-img-text'])
      }

      const file = input.files?.[0]
      if (file === undefined) {
        return
      }
      try {
        const imgURL = await uploadS3AnddInsertEmbed(file)
        const editor = quillRef.current.getEditor()
        setImgList((prevList) => [
          ...prevList,
          `https://horong-service.s3.ap-northeast-2.amazonaws.com/${imgURL}`,
        ])
        const range = editor.getSelection()
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
    if (!quillRef.current) {
      return
    }
    const editor = quillRef.current?.getEditorContents()
    const imgTags = Array.from(
      new DOMParser().parseFromString(JSON.stringify(editor), 'text/html')
        .images,
    )

    if (imgTags.length >= 5) {
      return toast.error(COMMUNITY_CONSTANT[lang]['post-limit-img-text'])
    }

    if (type.includes('image')) {
      try {
        const blob = await fetch(dataUrl).then((res) => res.blob())
        const file = new File([blob], 'image.png', { type: 'image/png' })

        const imgURL = await uploadS3AnddInsertEmbed(file)
        const editor = quillRef.current.getEditor()
        const range = editor.getSelection()

        setImgList((prevList) => [
          ...prevList,
          `https://horong-service.s3.ap-northeast-2.amazonaws.com/${imgURL}`,
        ])

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
          placeholder={COMMUNITY_CONSTANT[lang]['post-input-placeholder']}
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
        value={content}
        theme="snow"
      />
    </div>
  )
}

export default PostEditor

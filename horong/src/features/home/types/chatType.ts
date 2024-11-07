import { ReactElement } from 'react'

export type ChatType = {
  type: 'horong' | 'user'
  text: string | ReactElement
  uuid: string
}

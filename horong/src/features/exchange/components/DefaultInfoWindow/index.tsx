import { InfoWindow } from '@vis.gl/react-google-maps'

import useInfoWindowStore from '@/features/exchange/hooks/useInfoWindowStore.ts'
import { decodeHtmlEntities } from '@/features/exchange/utils/decodeHtmlEntities/index.ts'

interface DefaultInfoWindowProps {
  first: string
}

function DefaultInfoWindow({ first }: DefaultInfoWindowProps) {
  const { isGlobalInfowindowOpen, closeGlobalInfowindow } = useInfoWindowStore()

  return (
    <>
      {isGlobalInfowindowOpen && (
        <InfoWindow
          anchor={marker}
          className="rounded-2xl"
          onClose={() => closeGlobalInfowindow()}
          maxWidth={300}
          headerContent={<h3 className="text-xs text-black">{data.name}</h3>}
        >
          <ul className="flex list-inside list-disc flex-col gap-y-2 text-[.625rem] text-black">
            <li>
              <span>{decodeHtmlEntities(data.address)}</span>
              <br />
            </li>
            {data.phone !== '' && (
              <li>
                <span>{decodeHtmlEntities(data.phone)}</span>
                <br />
              </li>
            )}
            {data?.description !== '' && (
              <li>
                <span>{decodeHtmlEntities(data?.description)}</span>
              </li>
            )}
          </ul>
        </InfoWindow>
      )}
    </>
  )
}

export default DefaultInfoWindow

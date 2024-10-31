import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps'
import { useCallback, useState } from 'react'

import { ExchangePromise } from '@/features/exchange/types/ExchangeType.ts'
import { decodeHtmlEntities } from '@/features/exchange/utils/decodeHtmlEntities/index.ts'
import MapPinSVG from '@/static/svg/exchange/exchange-map-pin-icon.svg'

interface MapMarkerProps {
  data: ExchangePromise
}

export default function MapMarker({ data }: MapMarkerProps) {
  const [markerRef, marker] = useAdvancedMarkerRef()
  const [infoWindowShown, setInfoWindowShown] = useState<boolean>(false)

  const handleMarkerClick = useCallback(
    () => setInfoWindowShown((isShown) => !isShown),
    [],
  )

  const handleClose = useCallback(() => setInfoWindowShown(false), [])

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: data.latitude, lng: data.longitude }}
        onClick={() => handleMarkerClick()}
      >
        <MapPinSVG />

        {infoWindowShown && (
          <InfoWindow
            anchor={marker}
            className="rounded-2xl"
            onClose={handleClose}
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
              {data.description !== '' && (
                <li>
                  <span>{decodeHtmlEntities(data.description)}</span>
                </li>
              )}
            </ul>
          </InfoWindow>
        )}
      </AdvancedMarker>
    </>
  )
}

import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps'
import { useCallback, useState } from 'react'

import { ExchangePromise } from '@/features/exchange/types/ExchangeType.ts'
import { decodeHtmlEntities } from '@/features/exchange/utils/decodeHtmlEntities/index.ts'

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
      />
      {infoWindowShown && (
        <InfoWindow
          anchor={marker}
          onClose={handleClose}
          headerContent={<h3>{data.name}</h3>}
        >
          <div className="flex flex-col">
            <span className="py-2">
              주소: {decodeHtmlEntities(data.address)}
            </span>
            <br />
            <span>{decodeHtmlEntities(data.description)}</span>
          </div>
        </InfoWindow>
      )}
    </>
  )
}

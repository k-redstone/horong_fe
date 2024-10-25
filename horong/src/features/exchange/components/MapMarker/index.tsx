import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps'
import { useCallback, useState } from 'react'

interface MapMarkerProps {
  latitude: number
  longitude: number
}

export default function MapMarker({ latitude, longitude }: MapMarkerProps) {
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
        position={{ lat: latitude, lng: longitude }}
        onClick={() => handleMarkerClick()}
      />
      {infoWindowShown && (
        <InfoWindow
          anchor={marker}
          onClose={handleClose}
          headerContent={<h3>남산환전</h3>}
        >
          <div className="flex flex-col">
            <span className="py-2">
              주소: 서울특별시 중구 퇴계로 38 1층 (남창동 169-4)
            </span>
            <span>현재 환율 191.50원</span>
          </div>
        </InfoWindow>
      )}
    </>
  )
}

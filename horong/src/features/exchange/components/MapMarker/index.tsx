import { AdvancedMarker, useAdvancedMarkerRef } from '@vis.gl/react-google-maps'
import { useCallback } from 'react'

import { useInfowindow } from '@/features/exchange/contexts/infowindowProvider/index.tsx'
import { ExchangePromise } from '@/features/exchange/types/ExchangeType.ts'
import MapPinSVG from '@/static/svg/exchange/exchange-map-pin-icon.svg'
interface MapMarkerProps {
  data: ExchangePromise
}

export default function MapMarker({ data }: MapMarkerProps) {
  const [markerRef, marker] = useAdvancedMarkerRef()
  const {
    isGlobalInfowindowShow,
    setGlobalInfoWindowShow,
    setPlace,
    setMarker,
    handleGlobalClose,
  } = useInfowindow()

  const handleMarkerClick = useCallback(() => {
    if (isGlobalInfowindowShow) {
      handleGlobalClose()
    }
    setPlace(data)
    setMarker(marker)
    setGlobalInfoWindowShow(true)
  }, [
    isGlobalInfowindowShow,
    setPlace,
    data,
    setMarker,
    marker,
    setGlobalInfoWindowShow,
    handleGlobalClose,
  ])

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: data.latitude, lng: data.longitude }}
        onClick={() => handleMarkerClick()}
      >
        <MapPinSVG />
      </AdvancedMarker>
    </>
  )
}
